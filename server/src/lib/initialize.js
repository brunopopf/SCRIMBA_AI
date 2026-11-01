import express from 'express';
import { setupHealthcheckRoutes } from './routes/index.js';
import { setupConfig } from './config/index.js';
import dotenv from "dotenv"

export const initialize = () => {
    console.log("initalizing server..");

    dotenv.config();
    const ENV = process.env.ENV || 'development';
    const HOST = process.env.HOST || 'localhost';
    const PORT = process.env.PORT || 3001;
    
    const app = express();
    setupHealthcheckRoutes(app);
    setupConfig(app);
    // setupRequestMiddlewares(app);
    // setupLoggingMiddlewares(app);
   
    app.listen(PORT, HOST, () => {
        console.log(`
            ------------------------------------------------------
                    Server initialization complete
                    - Address:          http://${HOST}:${PORT}
                    - Environment:      ${ENV}
                    - Process ID:       ${process.pid}
                    - Node Version:     ${process.version}
            ------------------------------------------------------
                `
        );
    });
    // initializeAuth(app);
    return app;
  };