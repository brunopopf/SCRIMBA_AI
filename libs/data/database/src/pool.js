import pg from 'pg';
import { getDatabaseUrl } from './getDatabaseUrl.js';

const { Pool } = pg;

let poolInstance = null;

export const getPool = () => {
    if (!poolInstance) {
        const connectionString = getDatabaseUrl();
        poolInstance = new Pool({
            connectionString,
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