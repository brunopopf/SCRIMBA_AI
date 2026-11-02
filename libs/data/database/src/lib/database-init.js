import { getPool } from "./pool.js";

// Create dreams table if it doesn't exist
export const initDatabase = async () => {
    const client = await getPool().connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS dreams (
          id SERIAL PRIMARY KEY,
          dream_text TEXT NOT NULL,
          interpretation TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Database initialized');
    } catch (error) {
      console.error('Database initialization error:', error);
    } finally {
      client.release();
    } 
  }