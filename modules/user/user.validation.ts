import joi from 'joi';

const showUserValidation = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
};
const userSignUpValidation = {
  body: joi.object().keys({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
};
const userLoginValidation = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
};

export { showUserValidation, userSignUpValidation, userLoginValidation };
