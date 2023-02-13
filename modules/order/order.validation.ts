import joi from 'joi';

const addProductValidation = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
  body: joi.object().keys({
    product_id: joi.number().required(),
    quantity: joi.number().required(),
  }),
};
const showProductsValidation = {
  params: joi.object().keys({
    id: joi.number().required(),
  }),
};

export { addProductValidation, showProductsValidation };
