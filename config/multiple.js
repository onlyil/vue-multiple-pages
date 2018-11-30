const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pagesPath = path.resolve(__dirname, '..', 'src/pages')
const config = require('../config')

const dirs = fs.readdirSync(pagesPath)

const createMultipleEntries = function () {
  const entries = {}
  dirs.forEach(dir => {
    entries[dir] = `${pagesPath}/${dir}/main.js`
  })
  return entries
}

const createMultipleHtmlPlugins = function () {
  const devPlugins = []
  const proPlugins = []
  dirs.forEach(dir => {
    devPlugins.push(new HtmlWebpackPlugin({
      filename: `${dir}.html`,
      template: `${pagesPath}/${dir}/index.html`,
      chunks: [dir, 'manifest', 'vendor'],
      inject: true,
    }))
    proPlugins.push(new HtmlWebpackPlugin({
      filename: `${config.build.indexBase}/${dir}.html`,
      template: `${pagesPath}/${dir}/index.html`,
      chunks: [dir, 'manifest', 'vendor'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }))
  })
  return {
    devPlugins,
    proPlugins
  }
}

const createMultipleDevServerRewrites = function () {
  const rewrites = []
  dirs.forEach(dir => {
    rewrites.push({
      from: new RegExp(`${dir}(\/*)`),
      to: path.posix.join(config.dev.assetsPublicPath, `${dir}.html`)
    })
  })
  rewrites.push({
    from: /.*/,
    to: path.posix.join(config.dev.assetsPublicPath, `${dirs[0]}.html`)
  })
  return rewrites
}

module.exports = {
  entries: createMultipleEntries,
  htmlPlugins: createMultipleHtmlPlugins,
  rewrites: createMultipleDevServerRewrites,
}
