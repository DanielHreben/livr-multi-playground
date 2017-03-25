const webpack = require('webpack');

const prodPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];

const devPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    })
];

module.exports = {
    entry: ['babel-polyfill', './src/main.jsx'],
    output: {
        path: `${__dirname  }/public/static/build/`,
        filename: 'main.js',
        publicPath: 'static/build/'
    },
    resolve: {
        modules: ['./src', 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json?$/,
                use: [ 'json-loader' ],
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: [ /public/ ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: [ /public/ ]
            },
            {
                test: /\.gif$/,
                use: [ {
                    loader: 'url-loader',
                    query: 'limit=10000&mimetype=image/gif'
                } ]
            },
            {
                test: /\.jpg$/,
                use: [ {
                    loader: 'url-loader',
                    query: 'limit=10000&mimetype=image/jpg'
                } ]
            },
            {
                test: /\.png$/,
                use: [ {
                    loader: 'url-loader',
                    query: 'limit=10000&mimetype=image/png'
                } ]
            },
            {
                test: /\.svg$/,
                use: [ {
                    loader: 'url-loader',
                    query: 'limit=26000&mimetype=image/svg+xml'
                } ]
            },
            {
                test: /\.(woff2?|ttf|eot)$/,
                use: [ {
                    loader: 'url-loader',
                    query: 'limit=100000'
                } ]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './public',
        port: 8090,
        inline: true,
        proxy: {
            '/api/*': { target: 'http://localhost:8080/' }
        }
    },
    plugins: process.env.NODE_ENV === 'production'
    ? prodPlugins
    : devPlugins
};
