import { ping } from './ping.js';
import { health } from './health.js';
import { shutdown } from './shutdown.js';

export const setupHealthcheckRoutes = (app) => {
    app.get('/ping', ping);
    app.get('/health', health);
    app.get('/shutdown', shutdown);
}