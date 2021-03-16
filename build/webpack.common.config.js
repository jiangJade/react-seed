const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const STATIC_PATH = 'static';

const webpackCommonConfig = {
    entry: {
        main: path.join(__dirname, '../src/index.js'),
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: `${STATIC_PATH}/js/[hash].[name].js`,
        chunkFilename: `${STATIC_PATH}/js/[name].[hash:5].chunk.js`
    },
    resolve: {
        alias: {
            '@/images': path.join(__dirname, '../src/images'),
            '@/components': path.join(__dirname, '../src/components'),
            '@/utils': path.resolve(__dirname, '../src/utils')
        },
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, '../src'),
            exclude: /node_modules/,
            use: ['babel-loader?cacheDirectory']
        }, {
            /**
             * 字体加载器
             */
            test: /\.(woff|eot|ttf|js|svg)$/,
            include: path.join(__dirname, '../src/fonts'),
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${STATIC_PATH}/fonts/[hash].[ext]`
                    }
                }
            ]
            /**
             * 图片加载器
             */
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            include: path.join(__dirname, '../src/images'),
            use: [
                {
                    loader: 'file-loader',
                }
                // {
                //     loader: ImageMinimizerPlugin.loader,
                //     options: {
                //         severityError: 'warning', 
                //         minimizerOptions: {
                //             plugins: ['gifsicle']
                //         }
                //     }
                // }
            ]
        }, {
            test: /\.ico$/,
            include: path.join(__dirname, '../src/images'),
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${STATIC_PATH}/images/[name].[ext]`
                    }
                }
            ]
        }]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.scss$/,
                    chunks: 'all',
                    enforce: true
                },
                commonsJS: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
                    test: /common\/|components\//,
                    name: 'commonsJS',
                    priority: 10,
                    minChunks: 2, // 表示被引用次数，默认为1；
                    enforce: true
                }
            }
        }
    },
    plugins: [

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/), // 指定moment加载中文
        // 主页面入口index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new ZipWebpackPlugin ({
            path: path.join(__dirname, '../dist'),
            filename: 'reactDist.zip'
        }),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false
                                }
                            ]
                        }
                    ]
                ]
            }
        })
    ]
};

module.exports = webpackCommonConfig;