const fs = require('fs')

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

module.exports = helpers
  