import joi from 'joi';

const showProductValidation = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
};
const addProductValidation = {
  body: joi.object().keys({
    name: joi.string().required(),
    price: joi.number().required(),
  }),
};

export { showProductValidation, addProductValidation };
