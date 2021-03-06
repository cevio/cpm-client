const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = env => {
  const isPro = env === 'production';
  return [
    {
      test: /\.js(x)?$/i,
      loader: 'babel-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          less: isPro ? [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
          ] : [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader'
          ],
          md: [
            'html-loader',
            'markdown-it-loader'
          ]
        }
      }
    },
    {
      test: /\.(le|c)ss$/,
      use: isPro ? [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ] : [
        'vue-style-loader',
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    },
    {
      test: /\.(svg|ttf|woff)$/,
      use: 'file-loader'
    },
    {
      test: /\.md$/,
      use: [
        'html-loader',
        'markdown-it-loader'
      ]
    }
  ]
}