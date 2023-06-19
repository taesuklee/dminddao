//Regex match expressions
exports.fetchJobId = /(?<=Job successfully submitted. Job ID: )(.*)/gm
exports.fetchCID = /(?<=CID : )(.*)/gm

//Regex to match pattern and extract
exports.extract = (pattern, text) => {
    const regex = pattern
    var m
    while ((m = regex.exec(text)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }
        console.log(`m: ${m[0]}`)
        return m[0]
    }
}
