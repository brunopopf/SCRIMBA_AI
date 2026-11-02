
import { getPool } from '../../../../../libs/data/database/src/inedx.js';

export const health =  async (req, res) => {
    try {
      const pool = getPool();
      await pool.query('SELECT 1');
      res.json({
        status: 'ok',
        db: 'connected',
        uptime: process.uptime()
      });
    } catch (err) {
      res.status(503).json({
        status: 'error',
        db: 'disconnected',
        message: err.message,
        uptime: process.uptime()
      })
    }
  };