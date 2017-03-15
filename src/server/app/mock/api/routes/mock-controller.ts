import { Logger, LoggerFactory } from '../../../../../common/logging';

import { Model } from '../../../../../common/models/model';
import { RestController } from '../../../common';
import { RestService } from '../../../common/rest/rest-service';

export class MockController<T extends Model> extends RestController {
  ;
  constructor(private model: { new (obj: any): T; }, private service: RestService<T>) {
    super();
  }

  createModel(): T {
    return new this.model({});
  }

  private static readonly LOGGER: Logger = LoggerFactory.getLogger();

  getAll(req, res, next): Promise<any> {
    MockController.LOGGER.debug('Retrieving all objs');

    return this.service.getAll()
      .then((objs: Array<T>) => {
        console.log(objs);
        return this.respond(res, objs);
      });
  }

  get(req, res, next): any {
    return this.respond(res, req.obj);
  }

  create(req, res, next): Promise<any> {
    const obj = this.createModel();
    this.validateModel(obj);

    return this.service.create(obj)
      .then((obj: T) => {
        return this.respond(res, obj);
      });
  }

  update(req, res, next: any): Promise<any> {
    const objToUpdate: T = (<T>req.obj);
    objToUpdate.set(req.body);
    this.validateModel(objToUpdate);

    return this.service.update(objToUpdate.id, objToUpdate)
      .then((updatedObj: T) => {
        return this.respond(res, updatedObj);
      });
  }

  delete(req, res, next): Promise<any> {
    return this.service.delete(req.obj.id)
      .then(() => {
        return this.respondNoContent(res);
      });
  }

  resolveObj(req, res, next, Id: string): Promise<any> {
    return this.service.get(Id)
      .then((obj: T) => {
        this.validateResourceFound(obj);
        req.obj = obj;
        next();
      });
  }
}