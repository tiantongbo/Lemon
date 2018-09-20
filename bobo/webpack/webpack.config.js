const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "bundle-[hash].js"//打包后输出文件的文件名
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
   module: {
        rules: [
            {
                test: /(\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /(\.scss|\.css)$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    },{
                    	loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })
    ]
}