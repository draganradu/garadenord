'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const customBuild = require('./gara_de_nord_custom.js')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    

    // htacces
    customBuild.title('htacces')
    customBuild.moveFile('.htaccess','./src/router/','./dist/')

    // favicon
    customBuild.title('Favicon')
    customBuild.moveFile('favicon.ico','./src/assets/','./dist/')

    // dinamic
    customBuild.title('Dinamic Data')
    customBuild.makeDir('./dist/dinamic/')
    customBuild.moveFiles('./src/api/','./dist/dinamic/')

    // img 
    customBuild.title('Images')
    customBuild.makeDir('./dist/img/')
    customBuild.resizeImageAndCopy('./img/','./dist/img/')
    

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

