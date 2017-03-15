import { Model } from '../../../common/models';
import { RestService } from '../common/rest/rest-service';

export class MockService<T extends Model> implements RestService<T> {
  private objsMap: Map<string, T>;
  private maxObjId: number = 0;

  constructor(objs: Array<T>) {
    this.objsMap = this.populateMap(objs);

    const objIds = Array.from(this.objsMap.keys())
      .map(val => parseInt(val));

    this.maxObjId = Math.max(...objIds);
  }

  getAll(): Promise<Array<T>> {
    const objs = Array.from(this.objsMap.values());
    return Promise.resolve(objs);
  };

  get(id: string): Promise<T> {
    let obj = this.objsMap.get(id);

    if (obj == null) { return Promise.resolve(null); }

    return Promise.resolve(obj);
  }

  create(obj: T): Promise<T> {
    const newObjId = ++this.maxObjId;
    obj.id = newObjId.toString();

    this.objsMap.set(obj.id, obj);
    return Promise.resolve(obj);
  }

  update(id: string, obj: T): Promise<T> {
    this.objsMap.set(id, obj);
    return Promise.resolve(obj);
  }

  delete(id: string): Promise<void> {
    console.log('Deleting!');
    this.objsMap.delete(id);
    return Promise.resolve();
  }

  /////////////////////

  private populateMap(objs: Array<T>): Map<string, T> {
    const objsMap = new Map<string, T>();

    objs.forEach((obj) => objsMap.set(obj.id, obj));

    return objsMap;
  }
}