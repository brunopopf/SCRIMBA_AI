// export * from './initialize';
import { initialize } from '../apps/server/src/index.js'
import { initDatabase } from '../libs/data/database/src/index.js'

( 
    async () => {
        /*
        await migrate();
        await associateModels();
      
        await launchJobs(jobs);
      
        const dsn = process.env.SENTRY_PAYMENTS_API_DSN;
        const defaultPort = process.env.PAYMENTS_API_PORT;
      
        */
        const app = initialize();
        await initDatabase();
    }
)();