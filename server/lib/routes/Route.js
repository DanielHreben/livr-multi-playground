const Exception = require('../Exception');

class Route {
    constructor(params) {
        this.logger = params.logger;
        this.services = params.services;
        this.config = params.config;
    }

    run(actionName, args) {
        this.logger.info(actionName, args, 'Run action');
        const [serviceName, methodName] = actionName.split('/');

        return this.services[serviceName][methodName].run(args.params);
    }

    async renderPromise(req, res, promise) {
        const reqInfo = {
            url: req.url,
            params: req.params,
            body: req.body
        };

        try {
            const data = await promise;

            this.logger.info('Request ok', reqInfo);
            res.send(data);
        } catch (error) {
            if (error instanceof Exception) {
                this.logger.info(error.toHash(), 'Request rejected with error');
                res.send({
                    error: error.toHash()
                });

                return;
            }

            this.logger.error(
                error,
                reqInfo,
                'Request rejected with unknown error'
            );

            res.send({
                error: {
                    code: 'UNKNOWN_ERROR',
                    message: 'Please, contact your system administrator!'
                }
            });
        }
    }
}

module.exports = Route;
