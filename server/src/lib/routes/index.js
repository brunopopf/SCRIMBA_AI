import { ping } from './ping.js';
import { health } from './health.js';

export const setupHealthcheckRoutes = (app) => {
    app.get('/ping', ping);
    app.get('/health', health);
}