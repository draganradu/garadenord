'use strict'

const customBuild = require('./gara_de_nord_custom.js');

const settings = {
    commands: process.argv.splice(2)
}

// force exit
if (settings.commands.indexOf('exit') > -1 || settings.commands.length === 0){
    customBuild.title('Force Exit')
    return false;
}

// htacces
if (settings.commands.indexOf('htacces') > -1){
    customBuild.title('htacces')
    customBuild.copyFile('.htaccess','./src/router/','./dist/')
}

// robottext
if (settings.commands.indexOf('robottext') > -1){
    customBuild.title('robottext')
    customBuild.copyFile('robots.txt','./src/api/','./dist/')
}


// favicon
if (settings.commands.indexOf('favicon') > -1){
    customBuild.title('Favicon')
    customBuild.copyFile('favicon.ico','./src/assets/','./dist/')
}


// dinamic
if (settings.commands.indexOf('dinamic') > -1){
    customBuild.title('Dinamic Data')
    customBuild.makeDir('./dist/dinamic/')
    customBuild.copyFiles('./src/api/','./dist/dinamic/')
}

// img 
if (settings.commands.indexOf('images') > -1){
    customBuild.title('Images')
    customBuild.makeDir('./dist/img/')
    customBuild.resizeImageAndCopy('./img/','./dist/img/')
}

// buildPattern
// customBuild.buildColorPattern('./img/','./dist/dinamic/')

// // sitemap XML
// customBuild.title('SiteMap XML')
// customBuild.buildsitemap()

// console.log(settings)

