const boom = require('@hapi/boom');

function validatorHandler(schema, property){
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false }); // para mandar todos los errores juntos y no de a uno.

        if(error) {
            next(boom.badRequest(error))
        }else{
            next();
        };
    }
}

module.exports = validatorHandler;