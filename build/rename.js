'use strict'
const fs = require('fs')

const rename = function (url) {
    fs.readdir(url, function (err, files) {
        for(let file of files){
            let newFile = file.toLocaleLowerCase().replace(/_/g, '-')
            fs.rename(url + file, url + newFile, function (err) {
                if (err) throw err;
                console.log(file + ' is now ' + newFile);
              });

        }
        
    })
}


rename('./../img/')