const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackCommonConfig = require('./webpack.common.config.js');

const env = process.env;
const LOCAL_HOST = env.npm_package_server_local_host;
const LOCAL_PORT = env.npm_package_server_local_port;
const MOCK_HOST = env.npm_package_server_mock_host;
const MOCK_PORT = env.npm_package_server_mock_port;

const urlAll = require('../src/global/url.js');

const webpackDev = {
    devtool: 'inline-source-map',
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
            }, {
                // 在 src 中的 css, scss，开启css-module
                test: /\.(sa|sc|c)ss$/,
                include: path.join(__dirname, '../src'),
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            hmr: true
                        }
                    },
                    'css-loader?modules&import=true&importLoaders=true&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
                    'postcss-loader',
                    'sass-loader'
                ]
                
            },
            // 在 node_modules 中的 cssModule不开启
            {
                test: /\.(sa|sc|c)ss$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        host: LOCAL_HOST,
        port: LOCAL_PORT,
        disableHostCheck: true,
        compress: true,     // 开起服务压缩压缩
        // open: true,
        // hot: true, // 热更新
        inline: true,
        // historyApiFallback: true,
        noInfo: true,
        contentBase: path.join(__dirname, '../dist'), // 访问启动文件夹
        overlay: {
            errors: true
        },
        proxy: {
            '/mock': {
                // matches paths starting with '/mock'
                target: `http://${MOCK_HOST}:${MOCK_PORT}`,
                pathRewrite: { '^/mock': '' }
            },
            '/lydsjzx': {
                // matches paths starting with '/api'
                target: `http://${urlAll.url}`,
                pathRewrite: { '^/lydsjzx': '' }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
        })
    ]
};

module.exports = merge(webpackDev, webpackCommonConfig);