const path = require('path')
const config = require('../config')
// const webpack = require('webpack')
var utils = require('./utils')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const devMode = process.env.npm_lifecycle_event !== 'build';
// console.log(devMode);

function resolve(dir) {
    return path.join(__dirname, '..', dir) //__dirname 当前目录
}

module.exports = {
    //指定入口
    entry: '@/main.js',
    //指定出口
    output: {
        path: config.build.assetsRoot,
        filename: 'js/[name].js', //这里的name告诉我们的是进去得是什么名字出来的就是什么名字
        // chunkFilename: '[name].chunk.js'
    },

    resolve: {
        extensions: [' ', '.js', '.vue', '.json'], //导入的时候不用写拓展名
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src') //全局配置省略写方法
        }
    },

    module: {
        rules: [
            {
              test: /\.worker\.js$/,
              use: { loader: 'worker-loader' }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
                    loaders: {
                        css: [
                            'vue-style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader'
                        ],
                        less: [
                            'vue-style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'less-loader'
                        ],
                        scss: [
                            'vue-style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'fast-sass-loader'
                        ],
                        sass: [
                            'vue-style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'fast-sass-loader'
                        ],
                        styl: [
                            'vue-style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'stylus-loader'
                        ]
                    },
                    postLoaders: {
                        html: 'babel-loader'
                    },
                    
                }
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'fast-sass-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                  },{
                    loader: 'css-loader', // translates CSS into CommonJS
                  }, {
                      loader: 'less-loader',
                      options: {
                        // antd 的样式使用了 Less 作为开发语言，
                        // 并定义了一系列全局/组件的样式变量，
                        // 你可以根据需求进行相应调整。
                        // https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
                        modifyVars: {
                            'primary-color': '#CD6FA2',
                            'link-color': '#CD6FA2',
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true
                      
                  },
                    
                  }]
            },
            {
                test: /\.styl$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },

    plugins: [
        // make sure to include the plugin!
        // vue-loader在15之后需要在plugins中引入
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : 'css/[id].[hash].css'
        })
    ],

    // webpack 打公共包 extensions
    // optimization: {
    //     runtimeChunk: {
    //         name: "manifest"
    //     },
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendor",
    //                 chunks: "all"
    //             }
    //         }
    //     }
    // },
}