var express = require('express');
var path = require('path');
var tokenizeMarkdown = require('tokenize-markdown');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(port, () => console.log(`Server started on port ${port}`));