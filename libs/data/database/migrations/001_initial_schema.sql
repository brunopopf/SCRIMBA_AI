
-- Up Migration

-- 1. Enums
CREATE TYPE user_role AS ENUM ('ADMIN', 'CUSTOMER');

CREATE TYPE order_status AS ENUM (
    'PENDING',
    'PAID',
    'SHIPPED',
    'CANCELLED'
);

-- 2. Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'CUSTOMER',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- 3. Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    status order_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
);

CREATE INDEX idx_orders_user_id ON orders(user_id);

-- 4. Initial seed
INSERT INTO users (email, password_hash, role)
VALUES (
    'admin@monorepo.com',
    '$2b$10$hashedpasswordexample',
    'ADMIN'
);


-- Down Migration

-- Reverse dependency order
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS order_status;
DROP TYPE IF EXISTS user_role;
