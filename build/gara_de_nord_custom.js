const fs = require('fs')
const sharp = require('sharp')
const ColorThief = require('color-thief')
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

helpers.buildColorPattern = function (from, prodDestination, devDestination) {
    let thief = new ColorThief();
    let output = {}
    let loading = {
        i: 0,
        size: 0,
        output: 0
    }

    fs.readdir(from, function (err, files) {
        // handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
        } else {
            loading.size = Object.keys(files).length

            files.forEach(function (file) {
                output[file.split('.')[0]] = {
                    domniant: thief.getColor(from + file),
                    pattern: thief.getPalette(from + file, 8),
                }
                
                loading.i++
                loading.output = Math.round(loading.i / loading.size * 100)
                process.stdout.write("\r" + loading.output + " % " )
            });

            fs.writeFile(devDestination + 'colorPattern.json', JSON.stringify(output), 'utf8', (err) => {
                if(err){
                    console.log(err)
                } else {
                    fs.createReadStream(devDestination + 'colorPattern.json').pipe(fs.createWriteStream(prodDestination + 'colorPattern.json'));
                    console.log(`Success | Built color Pattern Json`)
                }
            })
        }
    });
} 

helpers.lastmod = function (file) {
    if(file){
        let tempDate = ExifImage.parseSync( './img/' + file).SubExif.DateTimeOriginal.split(/:| /);
        return  `${tempDate[0]}-${tempDate[1]}-${tempDate[2]}T${tempDate[3]}:${tempDate[4]}:${tempDate[5]}+00:00`;
    } else {
        let currentTime = new Date();

        return [currentTime.getFullYear(), currentTime.getMonth() + 1, currentTime.getDay() + 1].join('-') + 'T' + [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()].join(':') + '+00:00'; 
    }
}

helpers.xmlTag = function (settings) {
    return `<${settings.tag}>${settings.text}</${settings.tag}>\n`
}

helpers.xmlUrl = function (settings) {
    temp = '\n'
    temp += '   ' + helpers.xmlTag ({ tag: 'loc', text: settings.loc })
    temp += '   ' + helpers.xmlTag ({ tag: 'lastmod', text: settings.lastmod })
    temp += '   ' + helpers.xmlTag ({ tag: 'priority', text: settings.priority })
    temp += '   ' + helpers.xmlTag ({ tag: 'changefreq', text: settings.changefreq })

    return helpers.xmlTag({
        tag: 'url',
        text: temp
    })
}

helpers.buildsitemap = function () {
    fs.readdir('./img/', function (err, files) {
        
        let temp = ''
        temp += '<?xml version="1.0" encoding="utf-8"?>\n'
        temp += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        
        temp += helpers.xmlUrl({
            loc: 'https://www.fotodex.ro/',
            lastmod:  helpers.lastmod(),
            priority: '1',
            changefreq: 'daily',
        });
        
        for (fileUrl of files) {
            temp += helpers.xmlUrl({
                loc: 'https://www.fotodex.ro/' + fileUrl.split('.')[0],
                lastmod:  helpers.lastmod(fileUrl),
                priority: '0.8',
                changefreq: 'yearly',
            });
        }

        temp += '</urlset>'

        fs.writeFile('./dist/sitemap.xml', temp , 'utf8', (err) => {
            if(err){
                console.log(err)
            } else {
                console.log(`Success | Built Sitemap.xml`)
            }
        })
    })
}



helpers.title = function (title) {
    console.log('------------------------------------')
    console.log(title)
    console.log('------------------------------------')
}

module.exports = helpers
  