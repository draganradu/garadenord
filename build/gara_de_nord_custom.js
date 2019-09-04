const fs = require('fs')
const sharp = require('sharp')
const ColorThief = require('color-thief')
const convertToXML = require('xml-js')
const ExifImage = require('jpeg-exif')

let helpers = {}

helpers.makeDir = function (dirname) {
    if (!fs.existsSync (dirname) ){
        fs.mkdirSync(dirname)
        console.log(`Made directory: ${dirname} \n`)
    } else {
        console.log(`Directory exists: ${dirname} \n`)
    }
  }

helpers.copyFile = function (file,from,to){
    console.log(`Copy files: ${to}${file} \n`)
    fs.createReadStream(from + file).pipe(fs.createWriteStream(to + file))
}

helpers.copyFiles = function (from,to) {
    fs.readdir(from, function (err, files) {
        //handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            helpers.copyFile(file, from, to)
        });
    });
}

helpers.copyImageAndResize = function (file,w,from,to){
    let input = from + file
    let output = to + file.toLowerCase()
    sharp(input).resize({ width: w }).toFile(output)
        .then(function(newFileInfo) {
            console.log(`Success | ${file} | ${w}px`)
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
                helpers.copyImageAndResize(file,990,from,to);
            });
        }
    });
}

helpers.buildColorPattern = function (from, to) {
    let thief = new ColorThief();
    let output = {}

    fs.readdir(from, function (err, files) {
        // handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
        } else {
            files.forEach(function (file) {
                output[file.split('.')[0]] = {
                    domniant: thief.getColor(from + file),
                    pattern: thief.getPalette(from + file, 8),
                }
            });

            fs.writeFile(to + 'colorPattern.json', JSON.stringify(output), 'utf8', (err) => {
                if(err){
                    console.log(err)
                } else {
                    console.log(`Success | Built color Pattern Json`)
                }
            })
        }
    });
} 

helpers.buildsitemapLine = function (settings) {
    // tag: xml tag
    // text: the text inside the tag
    if (settings) {
        settings.tag = settings.tag || 'loc';
        settings.text = settings.text || 'https://www.fotodex.ro/';

        let output = {
            'type': 'element', 
            'name': settings.tag, 
            'elements': [{
                'type': 'text',
                'text' : settings.text
            }] 
        };
        return output;
    } else {
        console.log('No settings');
    }
};

helpers.buildsitemapSet = function (settings) {
    let temp = [] 
    if (settings) {
        //-------------------------- <loc>
        if(settings.loc){
            temp.push(
                helpers.buildsitemapLine({
                    'tag':'loc',
                    'text': settings.loc,
                })
            );
        } else {
            console.log('settings:loc is mandatory')
            return;
        } 
        //-------------------------- <lastmod>
        if(settings.lastmod){
            temp.push(
                helpers.buildsitemapLine({
                    'tag':'lastmod',
                    'text': settings.lastmod,
                })
            );
        }
        //-------------------------- <priority>
        if(settings.priority){
            temp.push(
                helpers.buildsitemapLine({
                    'tag':'priority',
                    'text': settings.priority,
                })
            );
        }
        //-------------------------- <changefreq>
        if(settings.changefreq){
            temp.push(
                helpers.buildsitemapLine({
                    'tag':'changefreq',
                    'text': settings.changefreq,
                })
            );
        }
        return temp;
    } else {
        console.log('No settings');
    }
}

helpers.lastmod = function (file) {
    if(file){
        var tempDate = ExifImage.parseSync( './img/' + file).SubExif.DateTimeOriginal.split(/:| /);
        return  `${tempDate[0]}-${tempDate[1]}-${tempDate[2]}T${tempDate[3]}:${tempDate[4]}:${tempDate[5]}+00:00`;
    } else {
        let currentTime = new Date();

        return [currentTime.getFullYear(), currentTime.getMonth() + 1, currentTime.getDay() + 1].join('-') + 'T' + [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()].join(':') + '+00:00'; 
    }
}

helpers.buildsitemap = function () {
    fs.readdir('./img/', function (err, files) {
        var tempFiles = {
            "declaration": {
                "attributes": {
                    "version": "1.0",
                    "encoding": "utf-8"
                }
            },
            "elements": [
                {
                    "type": "element",
                    "name": "urlset",
                    "attributes": {
                        "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"
                    },
                    "elements": [
                        {
                            "type": "element",
                            "name": "url",
                            "elements": [ ]
                        }
                    ]
                }
            ]
        }

        // landing page
        tempFiles.elements[0].elements[0].elements = tempFiles.elements[0].elements[0].elements.concat(
            helpers.buildsitemapSet({
                'loc': 'https://www.fotodex.ro/',
                'lastmod' : helpers.lastmod(),
                'priority': '1',
                'changefreq': 'daily'
            })
        );

        // to doo add the rest

        // handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
        } else {
            files.forEach(function (file) {

                // build entry for sitemap
                tempFiles.elements[0].elements[0].elements = tempFiles.elements[0].elements[0].elements.concat(
                    helpers.buildsitemapSet({
                        'loc': 'https://www.fotodex.ro/' + file.split('.')[0],
                        'lastmod' : helpers.lastmod(file),
                        'priority': '0.8',
                        'changefreq': 'yearly'
                    })
                );                  
            });

             // build sitemap file
            fs.writeFile('./dist/sitemap.xml', convertToXML.js2xml(tempFiles, {compact: false, spaces: 4}), 'utf8', (err) => {
                if(err){
                    console.log(err)
                } else {
                    console.log(`Success | Built Sitemap.xml`)
                }
            })
        }
    });
}


helpers.title = function (title) {
    console.log('------------------------------------')
    console.log(title)
    console.log('------------------------------------')
}

module.exports = helpers
  