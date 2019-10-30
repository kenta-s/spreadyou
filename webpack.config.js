const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|svg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: '/src/images',
              emitFile: true,
            },
          },
        ]
      },
      {
        test: /\.(js)$/,
        loaders: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
            }
          },
          {
            loader:'sass-loader',
          }
        ],
      },
    ],
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/dist/',
      writeToFileEmit: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new webpack.ExtendedAPIPlugin(),
  ],
}

// const mainConfig = mode => {
//   return Object.assign({}, config, {
//     entry: {
//       server: './server.js',
//       // 'static/bundle': './client.js',
//     },
//     target: 'node',
//     node: {
//       __filename: false,
//       __dirname: false,
//     }
//   })
// }

const serverConfig = mode => {
  return Object.assign({}, config, {
    entry: {
      server: './server.js',
      // 'static/bundle': './client.js',
    },
    target: 'node',
    node: {
      __filename: false,
      __dirname: false,
    }
  })
}

const mainConfig = mode => {
  return Object.assign({}, config, {
    entry: {
      main: './client.js',
    },
  })
}

const clientConfig = {
  target: 'web',
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'public', 'dist', 'static'),
    filename: 'bundle.js'
  },
  entry: {
    bundle: './client.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loaders: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        }
      },
    ],
  },
}

module.exports = (env, argv) => {
  const mode = argv.mode === 'production' ? 'production' : 'development'
  return [
    mainConfig(mode),
    // serverConfig,
    // clientConfig,
  ]
}
