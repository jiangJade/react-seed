// 生产环境
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const PurifyCssPlugin = require('purifycss-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackCommonConfig = require('./webpack.common.config');

const webpackConfig = {
    devtool: '',
    mode: 'production',
    module: {
        rules: [
            {
                /**
                 * eslint代码规范校验
                 */
                test: /\.(js|ts|tsx)$/,
                enforce: 'pre',
                include: path.join(__dirname, '../src'),
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: '.eslintrc.prod.json'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new PurifyCssPlugin({
            paths: glob.sync(path.join(__dirname, '../src/*.html'))
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false,
            __TEST__: false
        }),
        new webpack.HashedModuleIdsPlugin()

        /* 找到webpack.dll.config生成的`manifest.json`文件配置到`plugins`里面 */
        // new webpack.DllReferencePlugin({
        //     manifest: require(path.join(__dirname, '..', 'dist', 'manifest.json')),
        // }),
    ]
};
module.exports = merge(webpackConfig, webpackCommonConfig);