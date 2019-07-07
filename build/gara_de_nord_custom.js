const fs = require('fs')
const sharp = require('sharp')

let helpers = {}

helpers.makeDir = function (dirname) {
    if (!fs.existsSync (dirname) ){
        fs.mkdirSync(dirname)
        console.log(`Made directory: ${dirname} \n`)
    } else {
        console.log(`Directory exists: ${dirname} \n`)
    }
  }

helpers.moveFile = function (file,from,to){
    console.log(`Copy files: ${to}${file} \n`)
    fs.createReadStream(from + file).pipe(fs.createWriteStream(to + file))
}

helpers.moveFiles = function (from,to) {
    fs.readdir(from, function (err, files) {
        //handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            helpers.moveFile(file, from, to)
        });
    });
}

helpers.copyImageAndResize = function (file,h,from,to){
    let input = from + file
    let output = to + file.toLowerCase()
    sharp(input).resize({ height: h }).toFile(output)
        .then(function(newFileInfo) {
            console.log(`Success | ${file} | ${h}px`)
        })
        .catch(function(err) {
            onsole.log(`Error | + ${output}`)
        });
}

helpers.resizeImageAndCopy = function (from, to){
    fs.readdir(from, function (err, files) {
        // handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
        } else {
            files.forEach(function (file) {            
                helpers.copyImageAndResize(file,970,from,to);
            });
        }
    });
}


helpers.title = function (title) {
    console.log('------------------------------------')
    console.log(title)
    console.log('------------------------------------')
}

module.exports = helpers
  