import { getPool } from "./pool.js";

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