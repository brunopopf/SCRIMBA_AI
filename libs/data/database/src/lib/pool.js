import pg from 'pg';

const { Pool } = pg;

let poolInstance = null;

export const getPool = () => {
    if (!poolInstance) {
        poolInstance = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' 
                ? { rejectUnauthorized: false } 
                : false,
        });

        poolInstance.on('error', (err) => {
            console.error('Error inesperado en un cliente inactivo de la base de datos', err);
            process.exit(-1);
        });
    }
    return poolInstance;
};