import validate from 'validate.js';

export default class User {
  constructor() {
    this.email = '';
    this.password = '';

    this.constraints = {
      email: {
        presence: true
      },
      password: {
        presence: true
      }
    };
  }

  isValid() {
    return validate(this, this.constraints) === undefined;
  }

  getError(key) {
    let message = validate({ [key]: this[key] }, this.constraints);

    return message[key] ? message[key][0] : '';
  }
}