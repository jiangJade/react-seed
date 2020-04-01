const path = require('path');
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.config.js');

const env = process.env;
const LOCAL_HOST = env.npm_package_server_local_host;
const LOCAL_PORT = env.npm_package_server_local_port;
const MOCK_HOST = env.npm_package_server_mock_host;
const MOCK_PORT = env.npm_package_server_mock_port;

const urlAll = require('../src/global/url.js');

const webpackDev = {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                /**
                 * eslint代码规范校验
                 */
                test: /\.(js)$/,
                enforce: 'pre',
                include: path.join(__dirname, '../src'),
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: '.eslintrc.json'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        host: LOCAL_HOST,
        port: LOCAL_PORT,
        disableHostCheck: true,
        compress: true,     // 开起 gzip 压缩
        inline: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, '../dist'),
        overlay: {
            errors: true
        },
        proxy: {
            '/mock': {
                // matches paths starting with '/mock'
                target: `http://${MOCK_HOST}:${MOCK_PORT}`,
                pathRewrite: { '^/mock': '' }
            },
            '/api': {
                // matches paths starting with '/api'
                target: `http://${urlAll.url}`,
                pathRewrite: { '^/api': '' }
            }
        }
    }
};

module.exports = merge(webpackDev, webpackCommonConfig);