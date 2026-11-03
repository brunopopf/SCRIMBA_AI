
export const getDatabaseUrl = () => {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }

    if (process.env.NODE_ENV === 'production') {
        throw new Error(
            'FATAL: DATABASE_URL is missing in production environment. Fallback to individual DB_* variables is disabled for security.'
        );
    }

    //Local
    const user = process.env.DB_USER || 'postgres';
    const password = process.env.DB_PASSWORD || '';
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 5432;
    const name = process.env.DB_NAME || 'postgres';
    
    return `postgres://${user}:${password}@${host}:${port}/${name}`;
};