const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const STATIC_PATH = 'static';

const webpackCommonConfig = {
    entry: {
        main: path.join(__dirname, 'src/index.js'),
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: `${STATIC_PATH}/js/[chunkhash].[name].js`,
        publicPath: '/'
    },
    resolve: {
        alias: {
            images: path.join(__dirname, 'src/images'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router')
        },
        extensions: ['.js', '.jsx', '.css', '.scss', '.less']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            exclude: path.join(__dirname, 'src/fonts'),
            use: ['babel-loader?cacheDirectory=true']
            /**
             * 第三方组件的css, scss抽离为独立文件vendor.css
             */
        }, {
            test: /\.(css|scss)$/,
            include: path.join(__dirname, 'node_modules'),
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
            /**
            * 主项目的css合并到style.css
            */

        }, {
            test: /\.(css|scss)$/,
            // include: path.join(__dirname, 'src'),
            use: [
                'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
                'postcss-loader',
                'sass-loader',
                {options: 
                    {plugins: [require('autoprefixer')('last 100 versions')]}
                }
            ],
            // loader: extractStyle.extract([
            //     'css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]',
            //     'postcss-loader',
            //     'sass-loader'
            // ])
            // loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            // use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'postcss-loader'}, {loader: 'resolve-url-loader'},
            //     {
            //         loader: 'sass-loader', 
            //         options: { // loader 的额外参数，配置视具体 loader 而定
            //             sourceMap: true, // resolve-url-loader 需要启用 sourceMap 才能正确加载 Sass 里的相对路径资源
            //         }
            //     },
            //     {options: 
            //         {plugins: [require('autoprefixer')('last 100 versions')]}
            //     }
            // ],
            include: path.resolve(__dirname, 'src'),
            exclude: path.resolve(__dirname,'/node_modules')
            /**
             * 字体加载器
             */
        }, {
            test: /\.(woff|eot|ttf|js|svg)$/,
            include: path.join(__dirname, 'src/fonts'),
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
            include: path.join(__dirname, 'src/images'),
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
            include: path.join(__dirname, 'src/images'),
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
                vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
                    test: /node_modules\//,
                    name: 'page/vendor',
                    priority: 10,
                    enforce: true
                }
                // commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
                //     test: /common\/|components\//,
                //     name: `${STATIC_PATH}/commons`,
                //     priority: 10,
                //     minChunks: 2, // 表示被引用次数，默认为1；
                //     enforce: true
                // },
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
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/), // 指定moment加载中文
        new CleanWebpackPlugin(['dist']), // 清除编译目录
        new MiniCssExtractPlugin({
            filename: `${STATIC_PATH}/css/[chunkhash].css` //放到dist/css/下
        }),
        // 主页面入口index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index', 'common'],
            vendor: './vendor.dll.js', // 与dll配置文件中output.fileName对齐
            hash: true, // 防止缓存
            minify:{ removeAttributeQuotes: true } // 压缩 去掉引号
        }),
       
        new webpack.LoaderOptionsPlugin({
            minimize: true, // 压缩loader读取的文件
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                }
            }
        })
    ]
};

module.exports = webpackCommonConfig;