'use strict';
var log       = require('bunyan-singletone-facade');
var Exception = require('../Exception');

function Base(params) {
    this.services = params.services;
    this.config   = params.config;
}

Base.prototype = {
    run: function(actionName, args) {
        log.info(actionName, args, 'Run action');
        var actionPath = actionName.split('/');

        return this.services[ actionPath[0] ][ actionPath[1] ].run(args.params);
    },
    renderPromise: function (req, res, promise) {
        var reqInfo = {
            url:    req.url,
            params: req.params,
            body:   req.body,
        };

        return promise.then(function(data) {
            data.status = 1;
            log.info('Request ok', reqInfo);

            return res.send(data);
        }).catch(function(error) {
            /* istanbul ignore else */
            if (error instanceof Exception) {
                log.info(error.toHash(), 'Request rejected with error');
                res.send({
                    status: 0,
                    error: error.toHash()
                });
            } else {
                log.error(
                    error,
                    reqInfo,
                    'Request rejected with unknown error'
                );

                console.error('REQUEST URL: ',    req.url);
                console.error('REQUEST PARAMS: ', req.params);
                console.error('REQUEST BODY: ',   req.body);
                console.error('ERROR: ',          error ? (error.stack || error) : error);
                console.error('-------------------');

                res.send({
                    status: 0,
                    error: {
                        code:    'UNKNOWN_ERROR',
                        message: 'Please, contact your system administrator!'
                    }
                });
            }
        })
        .done();
    }
};

module.exports = Base;