'use strict';
var FS       = require('q-io/fs');
var Q        = require('q');
var execFile = Q.denodeify(require('child_process').execFile);

function Implementations (params) {
    this.path = params.path;
}

Implementations.prototype._readSchemas = function() {
    var self = this;

    return FS.list(self.path).then(function(implementations) {
        var implementationsPromises = implementations.map(function(name) {
            var implementation = {
                name: name,
                path: FS.join(self.path, name),
                scripts: {}
            };

            return FS.list(implementation.path).then(function(files) {

                files.forEach(function(file) {
                    if ( file.match(/^validate\.\w{1,6}$/) ) {
                        implementation.scripts.validate = file;
                    }

                    if ( file.match(/^version\.\w{1,6}$/) ) {
                        implementation.scripts.version = file;
                    }
                });

                return implementation;
            });
        });

        return Q.all(implementationsPromises);
    });
};

Implementations.prototype._detectVersions = function(schemas) {
    var promises = schemas.map(function(schema) {

        if (!schema.scripts.version) {
            console.error('Version script for ' + name + " not found, skipping...");
            return;
        }

        if (!schema.scripts.validate) {
            console.error('Validate script for ' + name + " not found, skipping...");
            return;
        }

        return execFile('./' + schema.scripts.version, { cwd: schema.path })
            .spread(function(version) {
                version = version.trim().split(' ');

                var languageVersion       = version[0] + ' ' + version[1];
                var implementationVersion = version[2] + ' ' + version[3];

                schema.version =
                    languageVersion       + '; ' +
                    implementationVersion + ';';

                return schema;
            })
            .catch(function(error) {
                console.error(error, 'Could not run detect version script of ' + schema.name +', skipping... ');
            });
    });

    return Q.all(promises);
};

Implementations.prototype.init = function() {
    var self = this;
    return self._readSchemas().then(self._detectVersions).then(function(schemas) {
        self.schemas = schemas
            .filter(function(schema) {
                return !!schema;
            })
            .sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });

    });
};

Implementations.prototype.list = function() {
    return this.schemas.clone();
};

Implementations.prototype.run = function(input, rules) {
    var self = this;

    return Q.all( self.list().map(function(implementation) {
        return execFile(
            './' + implementation.scripts.validate,
            [input, rules].map(JSON.stringify),
            { cwd: implementation.path }
        )
        .spread(JSON.parse)
        .then(function(result) {
            implementation.status = result.errors ? 'NOT_PASSED' : 'PASSED';
            implementation.result = result;
        })
        .catch(function(error) {
            implementation.status = 'FATAL';
            var re = new RegExp(['/', process.env.USER, '/'].join(''), 'g');
            implementation.error  = error.message.replace(re, '/<USER>/');
        })
        .thenResolve(implementation);
    }) );

};

module.exports = Implementations;