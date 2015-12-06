import path from 'path'
import webpack from 'webpack'
import NucleatePlugin from 'nucleate-webpack-plugin'

export default function makeWebpackConfig ({ srcDir }) {
  const isProduction = process.env.NODE_ENV === 'production'
  return {
    entry: 'nucleate/lib/entry',
    output: {
      path: './build/',
      publicPath: '/',
      filename: 'bundle.js',
      libraryTarget: 'umd'
    },
    module: {
      loaders: [
        {
          test: /\.md$/,
          include: srcDir,
          loaders: [
            'html-loader',
            'markdown-it-loader',
            'front-matter-loader?onlyBody' // Strip frontmatter before passing to markdown-it
          ]
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg)/,
          include: srcDir,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __NUCLEATE_SRC_DIR__: JSON.stringify(srcDir)
      }),
      new NucleatePlugin('main'),
      ...(isProduction
        ? [
          new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            sourceMap: false
          })
        ]
        : []
      )
    ],
    resolve: {
      root: srcDir
    },
    resolveLoader: {
      fallback: path.resolve(__dirname, '../node_modules')
    },
    devtool: isProduction
      ? 'eval'
      : undefined,
    devServer: {
      stats: { chunkModules: false, colors: true }
    }
  }
}
