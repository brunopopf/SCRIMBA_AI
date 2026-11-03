import 'dotenv/config';
// import { initialize } from 'server';
import { initDatabase } from 'database';
import { translateRouter } from './src/router.js';
import { createServer, requireBody } from 'server';

( 
    async () => {

        /*
        await migrate();
        await associateModels();
      
        await launchJobs(jobs);
      
        const dsn = process.env.SENTRY_PAYMENTS_API_DSN;
        const defaultPort = process.env.PAYMENTS_API_PORT;
      
        */
        const app = createServer({
            port: process.env.PORT,
            routes: [
                { path: '/api/v1/translate', router: translateRouter, middlewares: [requireBody] }
            ],
            // setupRoutes: (app) => {
            //     app.use('/translate', requireBody, translateRouter);
            // }
        });
        await app.start();
        console.log("=> Translate api started")
                
        await initDatabase();
    }
)();