var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var marked = require('marked');
var adaptiveRenderer = require('./adaptiveRenderer');

var app = express();
var port = process.env.PORT || 3000;

marked.setOptions({
    renderer: adaptiveRenderer
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.text());

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// need to sanitize input from user
app.post('/api/markdown', (req, res) => {
    var text = req.body;
    res.json(marked(text));
});

app.listen(port, () => console.log(`Server started on port ${port}`));