var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var adaptiveParser = require('./lib/adaptiveParser');
var marked = require('marked');

var markedLexer = new marked.Lexer(); // use the default lexer
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.text());

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// need to sanitize input from user
app.post('/api/markdown', (req, res) => {
    var text = req.body;
    var tokens = markedLexer.lex(text);
    res.json(adaptiveParser.parse(tokens));
});

app.listen(port, () => console.log(`Server started on port ${port}`));