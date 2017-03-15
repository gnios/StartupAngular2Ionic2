import { InternalError, InvalidJsonError, RestError } from '../errors';

import { Logger } from "../../../../../common/logging";
import { LoggerFactory } from '../../../../../common/logging';

import serializeError = require('serialize-error');


export class RestErrorMiddleware {
  public static readonly LOGGER: Logger = LoggerFactory.getLogger();

  // Error handling middleware that takes an incoming error, normalizes it to some
  // subclass of HttpError and passes it along (to eventually be logged/serialized)
  static normalizeToRestError(err, req, res, next) {
    if (err instanceof RestError) {
      return next(err);
    }

  if (err instanceof SyntaxError) {
      return next(new InvalidJsonError());
    }

    return next(new InternalError(err));
  }

  // This should typically be the last error handling middleware that's mounted by express.
  // This will serialize the error to the user, and log it.
  static serializeRestError(err: RestError, req, res, next) {

    if (err instanceof InternalError) {
      const logFriendlyErrorMessage: string = serializeError(err.originalError);
      RestErrorMiddleware.LOGGER.error(logFriendlyErrorMessage);
    } else {
      const logFriendlyErrorMessage: string = serializeError(err);
      RestErrorMiddleware.LOGGER.warn(logFriendlyErrorMessage);
    }

    // serialize the error
    return res.status(err.httpStatusCode).json({
      error: err
    });
  }
}



