function addQuote(result) {
    return result.replace('(', "('").replace(/,/g, "','").replace(')', "')")
}

function addFunctionFormat(head, data) {
    return `$${head} = array(${data.toString()});`
}

function addArrayFormat(head, data) {
    return `'${head}'=>array(${data.toString()})`
}
// module.export  = addQuote
exports.addQuote = addQuote
exports.addFunctionFormat = addFunctionFormat
exports.addArrayFormat = addArrayFormat