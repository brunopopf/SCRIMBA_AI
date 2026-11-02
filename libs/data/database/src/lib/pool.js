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

export const assertDatabaseConnection = async () => {
    const pool = getPool();
    let client;
    try {
        client = await pool.connect();
        await client.query('SELECT 1');
        console.log('Database connection verified successfully.');
    } catch (error) {
        console.error('Database conection failed:', error);
        throw error;
    }finally{
        if(client){
            client.release();
        }
    }
};

export const query = async (text, params) => {
    const pool = getPool();
    return pool.query(text, params);
};