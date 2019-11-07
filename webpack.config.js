const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const PurifyCssPlugin = require('purifycss-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackCommonConfig = require('./webpack.common.config');

const webpackConfig = {
    devtool: 'source-map',
    module: {
        rules: [
            {
                /**
                 * eslint代码规范校验
                 */
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                include: path.join(__dirname, 'src'),
                // exclude: path.join(__dirname, 'src/components/companyInfo/companyInfo/relateInfo/map'), // 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
                // use: [
                //     {
                //         loader: 'eslint-loader',
                //         options: {
                //             configFile: '.eslintrc.prod.json'
                //         }
                //     }
                // ]
            }
        ]
    },
    plugins: [
        new PurifyCssPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new webpack.HashedModuleIdsPlugin(),
        /*找到webpack.dll.config生成的`manifest.json`文件配置到`plugins`里面*/
        // new webpack.DllReferencePlugin({
        //     manifest: require(path.join(__dirname, '..', 'dist', 'manifest.json')),
        // }),
    ]
};
module.exports = merge(webpackConfig, webpackCommonConfig); merge