function getValidator(validateRequest) {
    return async function validate(ctx) {
        const requestOptions = _getParameters(ctx);
        const errors = validateRequest(requestOptions);
        if (errors) {
            throw errors;
        }
    };

    function _getParameters(ctx) {
        const requestOptions = {};
        const path = ctx.path.replace(/{/g, ':').replace(/}/g, '');
        requestOptions.path = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
        requestOptions.headers = ctx.headers;
        requestOptions.params = ctx.params;
        requestOptions.query = ctx.query;
        requestOptions.method = ctx.httpMethod;
        requestOptions.body = ctx.body;

        return requestOptions;
    }
}

module.exports = { getValidator };
