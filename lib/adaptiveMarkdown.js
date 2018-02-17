var fs = require('fs');
var path = require('path');
var util = require('util');
var marked = require('marked');
var adaptiveParser = require('./adaptiveParser');

var markedLexer = new marked.Lexer(); // use the default lexer
var readFile = util.promisify(fs.readFile);

async function transformFile(markdownFilePath) {
    if (path.extname(markdownFilePath) !== '.md') {
        return Promise.reject(`File at ${markdownFilePath} is not a markdown file`);
    }
    try {
        var markdownString = await readFile(markdownFilePath, {
            encoding: 'utf8'
        });
        console.log(markdownString, '\n');
        return transformString(markdownString);
    } catch(err) {
        return Promise.reject(err);
    }
}

function transformString(markdownString) {
    var tokens = markedLexer.lex(markdownString);
    return adaptiveParser.parse(tokens);
}

module.exports = {
    transformFile,
    transformString
};