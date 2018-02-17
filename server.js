var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var adaptiveMarkdown = require('./lib/adaptiveMarkdown');

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
    res.json(adaptiveMarkdown.transformString(text));
    console.log('\n');
});

app.listen(port, () => console.log(`Server started on port ${port}`));