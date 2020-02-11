var utils = require('./utils')
var xlsx = require('node-xlsx');
var fs = require('fs');

var obj = xlsx.parse(__dirname + '/Book1.xlsx');
const notUseString = ['Province']
let excelData = obj[0].data
let state = obj[0].data.map((result) => result[0])
// Step 1
const uniqueSet = new Set(state);

// Step 2
let backToArray = [...uniqueSet];
backToArray = backToArray.filter((result) => !result.includes(notUseString))

// StateArray
// let stateArray = `$stateArray = array(${backToArray.toString()});`
let stateArray = utils.addFunctionFormat('stateArray', backToArray.toString())
const provinceResult = utils.addQuote(stateArray)
fs.writeFile('provinceArray.txt', provinceResult, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  }); 
let objDistrict = {}
let objSubDistrict = {}
excelData = excelData.splice(1)
for(let row of excelData) {
    const province = row[0]
    const district = row[1]
    const subDistrict = row[2]
    if(province in objDistrict) {
        objDistrict[province].push(district)
    } else {
        objDistrict[province] = []
        objDistrict[province].push(district)
    }
}
// console.log(objDistrict)
// for(let key of Object.keys(objDistrict)) {
//     for(let i = 0; i < objDistrict[key].length; i++) {
//         let currentDistrict = {}
//         currentDistrict[objDistrict[key][i]] = objSubDistrict[objDistrict[key][i]]
//         objDistrict[key][i] = currentDistrict
//     }
// }
// console.log(objDistrict)

// console.log(objSubDistrict)
let districtSet = ''
for(let key of Object.keys(objDistrict)) {
    let formatDistrict = utils.addQuote(`'${objDistrict[key].toString()}'`)
    let arrayFormatDistrict = utils.addArrayFormat(key, formatDistrict)
    // console.log(formatDistrict)
    districtSet += arrayFormatDistrict
}
console.log(districtSet.replace(/\)\'/g, "),'"))
districtSet = districtSet.replace(/\)\'/g, "),'")
districtSet = utils.addFunctionFormat('cityArray', districtSet)

fs.writeFile('cityArray.txt', districtSet, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  }); 