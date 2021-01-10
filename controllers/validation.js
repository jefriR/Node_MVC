const Joi = require('@hapi/joi');

module.exports = {
    registerValidation: (data) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(6)
                .required(),
            email: Joi.string()
                .min(6)
                .required()
                .email(),
            password: Joi.string()
                .min(6)
                .required(),
            password2: Joi.string().min(6).required()
        });

        return schema.validate(data);
    },
    loginValidation: (data) => {
        const schema = Joi.object({
            email: Joi.string()
                .min(6)
                .required()
                .email(),
            password: Joi.string()
                .min(6)
                .required(),
        });

        return schema.validate(data);
    }

}