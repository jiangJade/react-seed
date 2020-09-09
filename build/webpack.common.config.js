const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 提供带 Content-Encoding 编码的压缩版的资源
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = ['js', 'css']; // 压缩JS css
const STATIC_PATH = 'static';

const webpackCommonConfig = {
    entry: {
        main: path.join(__dirname, '../src/index.js'),
        vendor: ['react', 'react-router-dom', 'react-dom']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: `${STATIC_PATH}/js/[hash:8].[name].js`,
        chunkFilename: `${STATIC_PATH}/js/[name].[hash:8].chunk.js`
    },
    resolve: {
        alias: {
            '@/images': path.join(__dirname, '../src/images'),
            '@/components': path.join(__dirname, '../src/components'),
            '@/utils': path.resolve(__dirname, '../src/utils'),
            '@/constants': path.resolve(__dirname, '../src/constants')
        },
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, '../src'),
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
                        name: `${STATIC_PATH}/fonts/[hash:8].[ext]`
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
                    loader: "file-loader",
                    options: {
                        limit: 10000,
                        name: `${STATIC_PATH}/images/[hash:8].[ext]`
                    }
                },
                'image-webpack-loader'
            ]
        }, {
            test: /\.ico$/,
            include: path.join(__dirname, '../src/images'),
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `${STATIC_PATH}/iconfont/[hash:8].[ext]`
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
                parallel: true,
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // vendors: {
                //     name: 'vendors',
                //     test: /node_modules/,
                //     chunks: 'all',
                //     priority: -10, // 优先级  一个chunck很可能满足多个缓存
                //     enforce: true
                // },
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
        // 生成打包流程图
        // new BundleAnalyzerPlugin({
        //     analyzerHost: '127.0.0.1', // 分析界面的启动url地址
        //     analyzerPort: 8888,
        //     openAnalyzer: false
        // }),
        // new webpack.ContextReplacementPlugin(/dayjs[\/\\]locale$/, /zh-cn/), // 指定dayjs加载中文

        // 主页面入口index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',  // 指定引入的文件名
            template: path.resolve(__dirname, '../src/index.html'),
            // chunks: [] // 多入口
            // minify: {
            //     removeAttributeQuotes: true, // 删除标点符号
            //     collapseWhitespace: true // 排成一行
            // }
        }),
        // 将打包后的文件夹压缩
        new ZipWebpackPlugin ({
            path: path.join(__dirname, '../dist'),
            filename: 'reactDist.zip'
        }),
        // 配置压缩
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        }),
        //maxChunks：使用大于或等于 1 的值，来限制 chunk 的最大数量。使用 1 防止添加任何其他额外的 chunk，这是因为entry/main chunk 也会包含在计数之中。
        //minChunkSize: 设置 chunk 的最小大小。
        //在合并 chunk 时，webpack 会尝试识别出具有重复模块的 chunk，并优先进行合并。任何模块都不会被合并到 entry   chunk 中，以免影响初始页面加载时间。
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5,
            minChunkSize: 100
        }),
        
    ]
};

module.exports = webpackCommonConfig;