var marked = require('marked');
var adaptiveRenderer = require('./adaptiveRenderer');
var AdaptiveInlineLexer = require('./adaptiveInlineLexer');
var adaptiveCardHelper = require('./adaptiveCardHelper');
var adaptiveParser = new marked.Parser({
    renderer: adaptiveRenderer
});

adaptiveParser.parse = function (src) {
    this.inline = new AdaptiveInlineLexer(src.links, this.options, this.renderer);

    /*
        Below is the default Parser parse code, this function overrides that functionality, can combine
        rendered tokens however desired
    */
    this.tokens = src.reverse();

    var out = [];
    while (this.next()) {
        out.push(this.tok());
    }
    
    return adaptiveCardHelper.createCard(out);
};

adaptiveParser.tok = function () {
    switch (this.token.type) {
        case 'space': {
            return adaptiveCardHelper.createTextBlock('');
        }
        // case 'hr': {
        //     return this.renderer.hr();
        // }
        // case 'heading': {
        //     return this.renderer.heading(
        //         this.inline.output(this.token.text),
        //         this.token.depth,
        //         this.token.text);
        // }
        // case 'code': {
        //     return this.renderer.code(this.token.text,
        //         this.token.lang,
        //         this.token.escaped);
        // }
        // case 'table': {
        //     var header = ''
        //         , body = ''
        //         , i
        //         , row
        //         , cell
        //         , flags
        //         , j;

        //     // header
        //     cell = '';
        //     for (i = 0; i < this.token.header.length; i++) {
        //         flags = { header: true, align: this.token.align[i] };
        //         cell += this.renderer.tablecell(
        //             this.inline.output(this.token.header[i]),
        //             { header: true, align: this.token.align[i] }
        //         );
        //     }
        //     header += this.renderer.tablerow(cell);

        //     for (i = 0; i < this.token.cells.length; i++) {
        //         row = this.token.cells[i];

        //         cell = '';
        //         for (j = 0; j < row.length; j++) {
        //             cell += this.renderer.tablecell(
        //                 this.inline.output(row[j]),
        //                 { header: false, align: this.token.align[j] }
        //             );
        //         }

        //         body += this.renderer.tablerow(cell);
        //     }
        //     return this.renderer.table(header, body);
        // }
        // case 'blockquote_start': {
        //     var body = '';
        //     while (this.next().type !== 'blockquote_end') {
        //         body += this.tok();
        //     }
        //     return this.renderer.blockquote(body);
        // }
        case 'list_start': {
            var body = [];
            var ordered = this.token.ordered;
            while (this.next().type !== 'list_end') {
                body.push(this.tok());
            }
            return this.renderer.list(body, ordered);
        }
        case 'loose_item_start':
        case 'list_item_start': {
            var body = [];
            while (this.next().type !== 'list_item_end') {
                if (this.token.type === 'text') {
                    Array.prototype.push.apply(body, this.parseText());
                } else {
                    let tokOut = this.tok();
                    if (Array.isArray(tokOut)) {
                        Array.prototype.push.apply(body, tokOut);
                    } else {
                        body.push(tokOut);
                    }
                }
            }
            return this.renderer.listitem(body);
        }
        // case 'html': {
        //     var html = !this.token.pre && !this.options.pedantic
        //         ? this.inline.output(this.token.text)
        //         : this.token.text;
        //     return this.renderer.html(html);
        // }
        case 'paragraph': {
            return this.renderer.paragraph(this.inline.output(this.token.text));
        }
        case 'text': {
            return this.renderer.paragraph(this.parseText());
        }
        default: {
            console.error(`Unhandled token type: ${this.token.type} - ${JSON.stringify(this.token)}`);
        }
    }
};

module.exports = adaptiveParser;