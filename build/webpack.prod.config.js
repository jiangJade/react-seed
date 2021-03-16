// 生产环境
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const PurifyCssPlugin = require('purifycss-webpack');
const webpackCommonConfig = require('./webpack.common.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();
const STATIC_PATH = 'static';

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
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },
   
    plugins: [
        new CleanWebpackPlugin(), // 清除编译目录
        new PurifyCssPlugin({
            paths: glob.sync(path.join(__dirname, '../src/*.html'))
        }), // 清除未使用的css
        // 提取css
        new MiniCssExtractPlugin({
            filename: `${STATIC_PATH}/css/[name].[contenthash:8].css` // 放到dist/css/下
        }),
        new webpack.DefinePlugin({
            // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false,
            __TEST__: false
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
};

module.exports = smp.wrap(merge(webpackConfig, webpackCommonConfig));