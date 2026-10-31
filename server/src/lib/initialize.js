import express from 'express';
import { setupHealthcheckRoutes } from './routes/index.js';
import { setupConfig } from './config.js';

export const initialize = () => {
    console.log("initalizing server..")
    
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