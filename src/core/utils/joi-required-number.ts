import * as Joi from 'joi';

export const baseJoiRequiredNumber = (fieldName: string) => {
  // validate number
  return Joi.number()
    .required()
    .error((errors: any) => {
      errors.forEach((err: any) => {
        switch (err.code) {
          case 'any.required':
            err.message = `${fieldName} is required`;
            break;
          case 'number.base':
            err.message = `${fieldName} must be a number`;
            break;
          default:
            break;
        }
      });
      return errors;
    });
};
