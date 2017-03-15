import { InvalidResourceUrlError } from '../common';
import { Logger } from "../../../common/logging/index";
import { LoggerFactory } from '../../..//common/logging';
import { MockRouter } from '../mock/api/routes/mock-router';
import { ProfessorModel } from '../../../common/models/professor';
import { Router } from 'express';
import { User } from '../../../common/models';
import express = require('express');


////////////////////

export class MockApiRouterFactory {
  private static readonly LOGGER: Logger = LoggerFactory.getLogger();

  private constructor() { }

  static getApiRouter(): Router {

    //mock controllers
    const router: Router = express.Router();
    // // mocks services

    const usersRouter: Router = new MockRouter<User>(User).router;
    const professorRouter: Router = new MockRouter<ProfessorModel>(ProfessorModel).router;

    MockApiRouterFactory.LOGGER.info('Mounting users route');
    router.use('/users', usersRouter);
    router.use('/professor', professorRouter);

    router.all('*', (req, res, next) => {
      next(new InvalidResourceUrlError());
    });

    return router;
  }
}