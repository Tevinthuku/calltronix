const fs = require("fs");

class ReadFromFile {
    constructor(fileName="interview") {
        this.fileName=fileName;
    }
    readFromFile() {
        const rawContent = fs.readFileSync(__dirname + `/data/${this.fileName}.json`, 'utf-8');
        return JSON.parse(rawContent)[1].Report;
    }
}

class FileContentFormatter extends ReadFromFile {
    static defaultDataContainer(content) {
           return Array.from(Array(Object.keys(content[0]).length).keys()).map(_ => [])
    }
    formatToDbInsertionFormat(){
       const content =  this.readFromFile();
        return content.reduce((acc, curr) => {
            const valuesOfObjectInArrayFormat = Object.values(curr);
            return acc.map((item, idx) =>  item.concat(valuesOfObjectInArrayFormat[idx])
            )
        }, FileContentFormatter.defaultDataContainer(content))
    }
}

module.exports = {
    FileContentFormatter
};
