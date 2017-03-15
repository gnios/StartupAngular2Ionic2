import { MockController } from './mock-controller';
import { MockModels } from '../../data/mock-models';
import { MockService } from '../../rest-mock';
import { Model } from '../../../../../common/models/model';
import { RestRouter } from '../../../common/rest/rest-router';

export class MockRouter<T extends Model> extends RestRouter {
  ctrl: MockController<T>;

  constructor(private model: { new (obj: any): T; }) {
    super();
    var mockModel = new MockModels<T>(model);
    var mockService = new MockService<T>(mockModel.array(10));
    this.ctrl = new MockController<T>(model, mockService);
    this.initRoutes();
    console.log(this.router);
  }

  initRoutes() {
    this.router.param('id', this.wrapParamFn(this.ctrl, this.ctrl.resolveObj));

    this.router.get('/', this.wrapRouteFn(this.ctrl, this.ctrl.getAll));
    this.router.post('/', this.wrapRouteFn(this.ctrl, this.ctrl.create));
    this.router.all('/', this.wrapRouteFn(this.ctrl, this.ctrl.throwMethodNotAllowedError));

    this.router.get('/:id', this.wrapRouteFn(this.ctrl, this.ctrl.get));
    this.router.delete('/:id', this.wrapRouteFn(this.ctrl, this.ctrl.delete));
    this.router.patch('/:id', this.wrapRouteFn(this.ctrl, this.ctrl.update));
    this.router.all('/:id', this.wrapRouteFn(this.ctrl, this.ctrl.throwMethodNotAllowedError));
  }
}