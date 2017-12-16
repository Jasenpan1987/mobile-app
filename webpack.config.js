var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var saveHashes = require('assets-webpack-plugin');
var helpers = require('./config/helpers');

var embedFileSize = 65536;

var commonConfig = {
  entry: {
    app: ['babel-polyfill', helpers.root('client', 'index.js')],
    vendor: helpers.root('client', 'vendor.js')
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: helpers.root('client'),
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        include: [/whatwg-.*/],
        use: ['babel-loader']
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: helpers.root('client'),
        loader: 'eslint-loader'
      },
      {
        test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader?name=fonts/[name].[ext]']
      },
      {
        test: /\.s(c|a)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader'
        })
      }
    ]
  }
};

function getPluginsByEnv(env) {
  if (env.production) {
    return [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: `vendor${env.production ? '-[hash]' : ''}.js` }),
      new ExtractTextPlugin(`app${env.production ? '-[hash]' : ''}.css`),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        output: { comments: false },
        mangle: false,
        compress: { warnings: false }
      }),
      new saveHashes({ path: helpers.root('..', 'src', 'InfoTrack.Planly.Web', 'wwwroot', 'dist', 'mobile') }),
    ]
  }
  
  return [new ExtractTextPlugin(`app${env.production ? '-[hash]' : ''}.css`)];
}

function getOutputByEnv (env) {
  if (env.production) {
    return {
      publicPath: '/',
      path: helpers.root('..', 'src', 'InfoTrack.Planly.Web', 'wwwroot', 'dist', 'mobile'),
      filename: '[name]-[hash].js'
    };
  }

  return {
    publicPath: '/',
    filename: '[name].js'
  }
}

function getResolveByEnv (env) {
  if(env.production) {
    return {
      alias: {
        // react: 'react/dist/react.min.js',
        // 'react-dom': 'react-dom/dist/react-dom.min.js',
        // redux: 'redux/dist/redux.min.js',
        // immutable: 'immutable/dist/immutable.min.js',
      }
    }
  }

  return {
  };
}

module.exports = function (env) {
  console.log("env", env);

  const configs = {
    entry: commonConfig.entry,
    output: getOutputByEnv(env),
    module: commonConfig.module,
    resolve: Object.assign({}, commonConfig.resolve, getResolveByEnv(env)),
    plugins: getPluginsByEnv(env)
  };

  if (!env.production) {
    configs.devtool = 'source-map';
    configs.devServer = {
      contentBase: helpers.root('client'),
      hot: true,
      proxy: {
        '/api/*': 'http://localhost:5000',
        '/images/*': 'http://localhost:5000',
        '/realtime/*': 'http://localhost:5000',
        '/signalr/*': 'http://localhost:5000',
        '/proxy/*': 'http://localhost:5000'
      }
    }
  }
  
  return configs;
}
