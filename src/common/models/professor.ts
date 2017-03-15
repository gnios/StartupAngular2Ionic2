import { Validatable, Validator, ValidatorError } from '../validation';

import { Model } from './model';

export class ProfessorModel extends Model  implements Validatable {
  public nome: string;
  public idade: string;
  public email: string;

  constructor(public data: ProfessorModel) {
    super(data.id)
    this.nome = data.nome || '';
    this.idade = data.idade || '';
    this.email = data.email || '';
  }

  validate(): Array<ValidatorError> {
    return Validator.validate(this, ProfessorModel.MODEL_CONSTRAINTS);
  }

  isValid() { return this.validate() === undefined; }

  toJSON(): any {
    return {
      id: this.id,
      nome: this.nome,
      idade: this.idade,
      email: this.email
    };
  }

  static readonly MODEL_CONSTRAINTS: any = {
    nome: {
      required: true,
      notNull: true,
      length: {
        minimum: 2,
        message: 'must be at least 2 characters.'
      }
    },
    idade: {
      required: true,
      notNull: true
    },
    email: {
      required: true,
      notNull: true,
      email: {
        message: 'must be a valid email address.'
      }
    }
  };
}

////////////////////

