'use strict';

/* istanbul ignore next */
var config  = require('./lib/configValidator')(
    require( process.env.TEST_MODE ? './etc/config_test' : './etc/config')
);
require('bunyan-singletone-facade').init({
    directory: 'logs',
    name:      'multylivr-playground'
});

var Implementations = require('./lib/Implementations');

var express = require('express');

// Middleware
var cors          = require('cors');
var bodyParser    = require('body-parser');

var app = express();
app.set('config', config);

app.use(cors({
    origin:      true,
    credentials: true,
}));

app.use(bodyParser.json({limit: 1024*1024, verify: function(req, res, buf){
    /* istanbul ignore next */
    try {
        JSON.parse(buf);
    } catch(e) {
        res.send({
            status: 0,
            error: {
                code:    'BROKEN_JSON',
                message: 'Please, verify your json'
            }
        });
    }
}}));

app.use(bodyParser.urlencoded({extended: false}));

app.set( 'implementations', new Implementations(config.implementations) );

var services = require('./lib/services/')({
    implementations: app.get('implementations'),
    config:          config.service,
});

var routes = require('./lib/routes/')({
    services: services,
});

var router = express.Router();
app.use('/api', router);

router.post('/implementations', routes('implementations/validate'));
router.get ('/implementations', routes('implementations/list'));

app.get('implementations').init().then(function() {
    app.listen(config.port, function(error) {
        if (error) throw error;
    });
}).done();

module.exports = app;
