import { Validatable, Validator, ValidatorError } from '../validation';
export class Model implements Validatable {
  
  constructor(public id: string) {
    this.id = id || '0';
  }
 
 validate(): Array<ValidatorError> {
    return Validator.validate(this, {});
  }

  isValid() { return this.validate() === undefined; }

  set(data: any): void {
    if (data == null) { return null; }

    for (const key in data) {
      if (this.hasOwnProperty(key) && key !== 'id') {
        this[key] = data[key];
      }
    }
  }

  isNew(): boolean {
    return this.id == null;
  }
}