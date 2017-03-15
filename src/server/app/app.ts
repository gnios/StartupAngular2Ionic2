import { Express, Router } from 'express';
import { Logger, LoggerFactory } from './../../common/logging';

import { AppConfig } from './config';
import { ExpressAppFactory } from './express-app-factory';
import { MockApiRouterFactory } from './mock/mock-api-router-factory';
import { RestErrorMiddleware } from './common';

const LOGGER: Logger = LoggerFactory.getLogger();

// Turn environment variables into a strongly typed configuration object
const appConfig: AppConfig = new AppConfig({'PORT': 3000, 'LOG_LEVEL': 'debug', 'SERVE_STATIC': true});

// Create the application router (to be mounted by the express server)
const apiRouter: Router = MockApiRouterFactory.getApiRouter();

// Get the application middleware (to be mounted after the api router)
const errorMiddleware = [
  RestErrorMiddleware.normalizeToRestError,
  RestErrorMiddleware.serializeRestError
];

const app: Express = ExpressAppFactory.getExpressApp(appConfig, apiRouter, null, errorMiddleware);

////////////////////

app.listen(appConfig.port, () => {
  LOGGER.info(`Express server listening on port ${appConfig.port}`);
});