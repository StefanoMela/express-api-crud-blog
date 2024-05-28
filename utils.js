const path = require("path");
const fs = require("fs");

const readJSON = (fileName) => {
    const filePath = path.join(__dirname, 'data', fileName + '.json');
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
}

const writeJSON = (fileName, data) => {
    const filePath = path.join(__dirname, 'data', fileName + '.json');
    const json = JSON.stringify(data);
    fs.writeFileSync(filePath, json);
}

const updateDBFile = (newFile) => {
    const filePath = path.join(__dirname, '/data/db.json');
    fs.writeFileSync(filePath, JSON.stringify(newFile));
}

module.exports = {
    readJSON,
    writeJSON,
    updateDBFile,
}