const pify = require('pify');
const path = require('path');
const fs = pify(require('fs'));
const childProcess = pify(require('child_process'));

class Implementations {
    constructor({ config, logger }) {
        this.path = config.path;
        this.logger = logger;
    }

    async _readSchemas() {
        const implementationsNames = await fs.readdir(this.path);

        const implementations = implementationsNames.map(async name => {
            const implementation = {
                name,
                path: path.join(this.path, name),
                scripts: {}
            };

            const files = await fs.readdir(implementation.path);

            for (const fileName of files) {
                if (fileName.startsWith('validate.')) {
                    implementation.scripts.validate = fileName;
                }

                if (fileName.startsWith('version.')) {
                    implementation.scripts.version = fileName;
                }
            }

            return implementation;
        });

        return Promise.all(implementations);
    }

    async _detectVersions(schemas) {
        for (const schema of schemas) {
            if (!schema.scripts.version) {
                this.logger.warn(`Version script for ${  schema.name  } not found, skipping...`);
                continue;
            }

            if (!schema.scripts.validate) {
                this.logger.warn(`Validate script for ${  schema.name  } not found, skipping...`);
                continue;
            }

            try {
                const [languageName, languageVersion, implementationName, implementationVersion] =
                (await childProcess.execFile(
                    `./${  schema.scripts.version}`,
                    { cwd: schema.path })
                )
                .trim()
                .split(' ');

                schema.version = `${languageName} ${languageVersion}; ${implementationName} ${implementationVersion};`;
            } catch (error) {
                this.logger.warn(error, `Could not run detect version script of ${  schema.name  }, skipping... `);
            }
        }

        return schemas;
    }

    async init() {
        this.schemas = (await this._detectVersions(await this._readSchemas()))
        .filter(schema => !!schema.version)
        .sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
    }

    list() {
        return [ ...this.schemas ];
    }

    async run(input, rules) {
        const implementations = this.list();

        for (const implementation of implementations) {
            try {
                const result = JSON.parse(await childProcess.execFile(
                  `./${  implementation.scripts.validate}`,
                  [input, rules].map(JSON.stringify),
                  { cwd: implementation.path }
                ));

                implementation.status = result.errors ? 'NOT_PASSED' : 'PASSED';
                implementation.result = result;
            } catch (error) {
                implementation.status = 'FATAL';
                const re = new RegExp(['/', process.env.USER, '/'].join(''), 'g');

                implementation.error = error.message.replace(re, '/<USER>/');
            }
        }

        return implementations;
    }
}

module.exports = Implementations;
