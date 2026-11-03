
export const registerRoutesStrategy = (app, options = {}) => {
    const hasSetupRoutes = typeof options.setupRoutes === 'function';
    const hasRoutesArray = Array.isArray(options.routes);

    if (hasSetupRoutes && hasRoutesArray) {
        throw new Error(
            'InvalidConfigurationError: You cannot supply both "routes" and "setupRoutes" to createServer(). Please choose one route definition strategy.'
        );
    }

    if (hasSetupRoutes) {
        options.setupRoutes(app);
        return;
    }

    if (hasRoutesArray) {
        options.routes.forEach(({ path, router, middlewares = [] }) => {
            if (path && router) {
                app.use(path, ...middlewares, router);
            }
        });
    }
};