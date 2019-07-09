
const customBuild = require('./gara_de_nord_custom.js')

customBuild.buildColorPattern('./../img/','./../dist/dinamic/');

// const fs = require('fs')
// let ColorThief = require('color-thief') 
// let tempThief = new ColorThief();

// let input = {
//     name: 'primavara_pranz_senin.jpg',
//     path: './../img/',
// }

// let output = {}

// output[input.name.split('.')[0]] = {
//     domniant: tempThief.getColor(input.path + input.name),
//     pattern: tempThief.getPalette(input.path + input.name, 8),
// }

// fs.writeFile('./../dist/dinamic/myjsonfile.json', JSON.stringify(output), 'utf8', (err) => {
//     if(err){
//         console.log(err)
//     } else {
//         console.log(`Success | Built color Pattern Json`)
//     }
// })
