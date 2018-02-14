var marked = require('marked');
var adaptiveRenderer = require('./adaptiveRenderer');
var adaptiveParser = new marked.Parser({
    renderer: adaptiveRenderer
});

adaptiveParser.parse = function (src) {
    /*
        Below is the default Parser parse code, this function overrides that functionality, can combine
        rendered tokens however desired
    */
    // this.inline = new marked.InlineLexer(src.links, this.options, this.renderer);
    // this.tokens = src.reverse();
    
    // var out = '';
    // while (this.next()) {
    //   out += this.tok();
    // }
    
    // return out;    
};

module.exports = adaptiveParser;