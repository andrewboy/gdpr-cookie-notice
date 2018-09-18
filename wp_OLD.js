const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
// const isProd = process.env.NODE_ENV === 'production'
const isProd = false

var config = {
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true
  //     }),
  //   ]
  // },
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: !isProd}},
          {loader: 'sass-loader', options: {sourceMap: !isProd}}
        ]
      }
      // {
      //   test: /\.scss$/,
      //   use: [
      //     {
      //       loader: "style-loader" // creates style nodes from JS strings
      //     },
      //     {
      //       loader: "css-loader" // translates CSS into CommonJS
      //     },
      //     {
      //       loader: "sass-loader" // compiles Sass to CSS
      //     }
      //   ]
      // }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue'
      // },
      // {
      //   test: /\.css$/,
      //   loader: 'style!less!css'
      // }
    ]
  },
  // externals: {
  //   moment: 'moment'
  // },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'gdpr_cookie_notice.min.css',
      // chunkFilename: "[id].css"
    }),
    // new UglifyJsPlugin({
    //   minimize: true,
    //   sourceMap: false,
    //   mangle: true,
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
}

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/gdpr_cookie_notice.js'),
    output: {
      filename: 'gdpr-cookie-notice.min.js',
      libraryTarget: 'window',
      library: 'gdpr_cookie_notice',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/gdpr_cookie_notice.js'),
    output: {
      filename: 'gdpr-cookie-notice.js',
      libraryTarget: 'umd',
      library: 'gdpr-cookie-notice',
      umdNamedDefine: true
    }
  })
]