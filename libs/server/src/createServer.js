import express from 'express';
import { setupConfig } from './config/index.js';
import { setupHealthcheckRoutes, registerRoutesStrategy } from './routes/index.js';

export const createServer = (options = {}) => {
    const port = options.port ?? process.env.PORT ?? 3001;
    const host = options.host ?? process.env.HOST ?? '0.0.0.0';
    const env = process.env.NODE_ENV ?? 'development';

    const app = express();

    setupConfig(app);
    setupHealthcheckRoutes(app);
    registerRoutesStrategy(app, options);

    let serverInstance = null;

    return {
        app,
        start: () => {
            return new Promise((resolve, reject) => {
                serverInstance = app.listen(port, host, () =>{
                    console.log(`
                        ------------------------------------------------------
                            Server started
                        ------------------------------------------------------
                                - Address:          http://${host}:${port}
                                - Environment:      ${env}
                                - Process ID:       ${process.pid}
                                - Node Version:     ${process.version}
                        ------------------------------------------------------
                            `
                    );
                    resolve(serverInstance);
                });
                serverInstance.on('error', (err) => reject(err));
            });
        },
        stop: () => {
            return new Promise((resolve, reject) => {
                if (!serverInstance) return resolve();
                serverInstance.close((err) => {
                    if (err) return reject(err);
                    serverInstance = null;
                    resolve();
                });
            });
        }
    };
};