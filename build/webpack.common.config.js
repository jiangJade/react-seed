const path = require('path');
const webpack = require('webpack');
// const precss = require('precss');
// const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const STATIC_PATH = 'static';

const devMode = process.env.NODE_ENV === 'production';

const webpackCommonConfig = {
    entry: {
        main: path.join(__dirname, '../src/index.js'),
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: `${STATIC_PATH}/js/[chunkhash].[name].js`,
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@/images': path.join(__dirname, '../src/images'),
            '@/components': path.join(__dirname, '../src/components'),
            '@/utils': path.resolve(__dirname, './../src/utils')
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.less']
    },
    module: {
        rules: [{
            test: /\.(js|jsx|ts|tsx)$/,
            include: path.join(__dirname, '../src'),
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    plugins: [
                        [
                            'react-css-modules',
                            {
                                generateScopedName: '[name]_[local]_[hash:base64:5]'
                            }
                        ]
                    ]
                }
            }
            /**
             * 第三方组件的css, scss抽离为独立文件vendor.css
             */
        }, {
            test: /\.(sa|sc|c)ss$/,
            // include: path.join(__dirname, '../src'),
            exclude: path.join(__dirname, '../node_modules'),
            use: [ devMode ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(sa|sc|c)ss$/,
            include: path.join(__dirname, '../node_modules'),
            use: [ devMode ? MiniCssExtractPlugin.loader : 'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
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
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${STATIC_PATH}/images/[hash].[ext]`
                    }
                }
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
    optimization: { // 提取主页面和魔盒页面共享的公共模块
        splitChunks: {
            // chunks: 'initial', 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
            cacheGroups: {
                // vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。
                //     test: /node_modules\//,
                //     name: 'page/vendor',
                //     priority: 10,
                //     enforce: true
                // },
                commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
                    test: /common\/|components\//,
                    name: 'commons',
                    priority: 10,
                    minChunks: 2, // 表示被引用次数，默认为1；
                    enforce: true
                }
                // css: {
                //     name: `${STATIC_PATH}/common/css`,
                //     test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true
                // } // 会生成css文件
            }
        },
        runtimeChunk: {
            name: STATIC_PATH
        }
    },
    plugins: [
        // 提取css
        new MiniCssExtractPlugin({
            filename: `${STATIC_PATH}/css/[chunkhash].css` // 放到dist/css/下
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/), // 指定moment加载中文
        new CleanWebpackPlugin(['dist']), // 清除编译目录
        // 主页面入口index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })

        // new webpack.LoaderOptionsPlugin({
        //     minimize: true, // 压缩loader读取的文件
        //     options: {
        //         postcss: function () {
        //             return [precss, autoprefixer];
        //         }
        //     }
        // })
    ]
};

module.exports = webpackCommonConfig;