
import { gracefulShutdown } from '../gracefulShutdown.js'

export const shutdown = (req, res) => {
    console.log('=== MANUAL SHUTDOWN TRIGGERED ===');
    res.send('Shutting down...');

    setTimeout(() => {
        process.kill(process.pid, 'SIGTERM');
    }, 100);
}