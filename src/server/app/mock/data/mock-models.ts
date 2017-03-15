import { Model } from '../../../../common/models/model';

export class MockModels<T extends Model> {

    constructor(private model: { new (obj: any): T; }) { }
    create(): T {
        return new this.model({});
    }
    single(index: number = 0): T {
        let data = this.create();
        Object.getOwnPropertyNames(data).forEach(function (val, idx, array) {
            if (val === 'id') {
                data[val] = index.toString();
            } else if (val === 'email') {
                data[val] = 'email' + index.toString() + '@test.com';
            } else if (typeof data[val] === 'string') {
                data[val] = 'teste' + index
            } else {
                data[val] = 1 + index;
            }
        });

        return data;
    }

    array(qt: number): Array<T> {
        let objs = new Array<T>();
        for (var index = 0; index < qt; index++) {
            objs.push(this.single(index));
        }
        return objs;
    }

}