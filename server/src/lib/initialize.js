import express from 'express';
import { setupHealthcheckRoutes } from './routes/index.js';
import { setupConfig } from './config/index.js';
import dotenv from "dotenv"

export const initialize = () => {
    console.log("initalizing server..")
    dotenv.config();
    
    const app = express();

    setupHealthcheckRoutes(app);
    setupConfig(app);
    // setupRequestMiddlewares(app);
    // setupLoggingMiddlewares(app);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
  
    // initializeAuth(app);
    return app;
  };