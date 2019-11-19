# 客服插件
## 功能
- umd插件，只需要引入cdn文件并且初始化后就能用
- 不能在vue里面用

## 总结
- 输出一个调用React.render的函数
- 将初始化的操作给使用者

## 问题
- 在非React包中会出现React不存在的问题
- 需要引入React或者将React打包到vender中
- webpack.config.js的splitChunk会将代码分离，且默认情况下是打开的模式

## 需要学习的地方
- babel
- webpack的配置与功能是如何对应的

## config-overrides.js
```js
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");


module.exports = function override(config, env) {
   const newConfig = {
    mode: 'production',
    entry: {
       "index.min": path.join(__dirname, "./src/index.js"),
       vendor: ['react','react-dom']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[hash].js',
        library: "Kefu",
        libraryTarget: 'umd',
        publicPath: '/dist/',
        umdNamedDefine: true,
        libraryExport: "default",
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'kefu.[hash].css',
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 2,
        }),
        new CompressionPlugin({
                algorithm: 'gzip',
                test:  /\.js($|\?)/i,
              }),
        new MinifyPlugin({},
            {
                test: /\.js($|\?)/i
            }
        ),
    ],
    optimization: {
        minimizer:[
            new UglifyJsPlugin({//压缩js
                cache:true,
                parallel:true,
                sourceMap:true
            }),
            new OptimizeCSSAssetsPlugin()//压缩css
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial"
                }
            }
        }
    

    },
    module: {
        rules : [
            {
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options:{
                        fallback: "file-loader",
                        name: "[name][md5:hash].[ext]",
                        outputPath: 'assets/',
                        publicPath: '/assets/'
                    }
                }    
            ]
        },
        {
            test: /\.*css$/,
            use : ExtractTextPlugin.extract({
                fallback : 'style-loader',
                use : [
                    'css-loader',
                    'sass-loader'
                ]
            })
        },
        {
            test: /\.(js|jsx)$/,
            use: [{
               loader: "babel-loader",
            }],
            
            include: path.resolve(__dirname, "src"),
            exclude: /node_modules/,
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            use: ["file-loader"],
        },
        {
            test: /\.(pdf|doc|zip)$/,
            use: ["file-loader"],
        }]
    }
   }
    
    const c = {
        ...config,
        ...newConfig
    }
    console.log("c", c)
    return c;
  }
 


```
