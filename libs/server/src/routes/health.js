
import { assertDatabaseConnection } from 'database';

export const health =  async (req, res) => {
    try {
      await assertDatabaseConnection();

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