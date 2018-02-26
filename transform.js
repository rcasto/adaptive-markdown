var adaptiveMarkdown = require('./lib/adaptiveMarkdown');

if (process.argv.length < 3) {
    console.error('Must pass in path of markdown file to transform');
    console.error('ex) node main.js path-markdown-file.md');
    return;
}

var transformFilePath = process.argv[2];

adaptiveMarkdown.transformFile(transformFilePath)
    .then(json => console.log(JSON.stringify(json, null, '\t')))
    .catch(err => console.error(err));