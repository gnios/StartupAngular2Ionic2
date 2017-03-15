import { RestController } from './rest-controller';
import { Router } from 'express';
import express = require('express');


export abstract class RestRouter {
  router: Router;

  constructor() {
    this.router = express.Router();
  }

  abstract initRoutes<T>(ctrl: any) ;

  wrapParamFn(controller: RestController, handlerFn: Function) {
    return (req, res, next, param) => {
      return Promise.resolve(handlerFn.bind(controller)(req, res, next, param))
        .catch(err => next(err));
    };
  }

  wrapRouteFn(controller: RestController, handlerFn: Function) {
    return (req, res, next) => {
      return Promise.resolve(handlerFn.bind(controller)(req, res, next))
        .catch(err => next(err));
    };
  }

}