const path = require("path");
const webpack = require("webpack");
const fs  = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/config/style/variables.less'), 'utf8'));

module.exports = {
  entry: ["@babel/polyfill", "./index.tsx"],
  devtool: "#eval-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {
            loader: "less-loader",
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {}
          }
        ]
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] ,
    alias: {
      config: path.resolve(__dirname, "src/config"),
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      core: path.resolve(__dirname, "src/core"),
      features: path.resolve(__dirname, "src/features"),
      routes: path.resolve(__dirname, "src/routes"),
      utils: path.resolve(__dirname, "src/utils"),
      mainLess: path.resolve(__dirname, "src/main.less"),
      api: path.resolve(__dirname, "src/api"),
    }
  },
  output: {
    path: path.resolve(__dirname, "public/"),
    publicPath: "/",
    filename: "app.js",
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: '/',
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};