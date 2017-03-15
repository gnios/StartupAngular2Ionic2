import { Model } from "../../../../common/models/model";

export interface RestService<T extends Model> {
  getAll(): Promise<Array<T>>;
  create(obj: T): Promise<T>;
  get(id: string): Promise<T>;
  update(id: string, obj: T): Promise<T>;
  delete(id: string): Promise<void>;
}