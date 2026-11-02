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

//Fail-Fast
export const connectDB = async () => {
    const pool = getPool();
    try {
        const client = await pool.connect();
        await client.query('SELECT 1'); // Prueba rápida de salud
        client.release();
        console.log('Database connection verified successfully.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        throw error;
    }
};

/**
 * Helper genérico para ejecutar consultas simples de forma limpia
 */
export const query = async (text, params) => {
    const pool = getPool();
    return pool.query(text, params);
};