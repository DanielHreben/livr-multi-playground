const bunyan = require('bunyan');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const compression = require('compression');

const config = require('./config');
const Implementations = require('./lib/Implementations');

const logger = bunyan.createLogger({ name: 'livr-multi-playground' });

const implementations = new Implementations({
    config: config.implementations,
    logger
});

const services = require('./lib/services/')({
    implementations,
    logger
});

const routes = require('./lib/routes/')({
    services,
    logger
});

const router = express.Router();
const app = express();

app.use(compression());
app.use(serveStatic(config.client.path, {
    maxAge: '365d',
    extensions: [ 'html' ]
}));
app.use(bodyParser.json({ limit: 1024 * 1024 }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router);

router.post('/implementations', routes('implementations/validate'));
router.get('/implementations', routes('implementations/list'));

async function start() {
    await implementations.init();
    await new Promise((resolve, reject) => app.listen(config.port, error => {
        error ? reject(error) : resolve();
    }));
}

start();
