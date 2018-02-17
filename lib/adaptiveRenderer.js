var marked = require('marked');
var adaptiveCardHelper = require('./adaptiveCardHelper');
var markdownHelper = require('./markdownHelper');

var renderer = new marked.Renderer();

// If something does not have a render function defined for it then it falls
// back to the default marked Renderer behavior

// Block Level render overrides
renderer.code = 
    (code, language) => console.log(`code: ${code} ${language}\n`);
renderer.blockquote = 
    quote => console.log(`blockquote: ${quote}\n`);
renderer.html = 
    html => console.log(`html: ${html}\n`);
renderer.heading = 
    (textBlock, level) => {
        console.log(`heading: ${JSON.stringify(textBlock)} ${level}\n`);
        textBlock.text = markdownHelper.toHeading(textBlock.text, level);
        return textBlock; 
    };
renderer.hr = 
    () => console.log(`hr\n`);
renderer.list = 
    (body, ordered) => {
        console.log(`list: ${JSON.stringify(body)} ${ordered}\n`);
    };
renderer.listitem =
    block => {
        console.log(`listitem: ${JSON.stringify(block)}\n`);
        return block;
    };
renderer.paragraph = 
    cardElems => {
        console.log(`paragraph: ${JSON.stringify(cardElems)}\n`)
        return adaptiveCardHelper.wrap(cardElems);
    };
renderer.table =
    (header, body) => console.log(`table: ${header} ${body}\n`);
renderer.tablerow =
    content => console.log(`tablerow: ${content}\n`);
renderer.tablecell =
    (content, flags) => console.log(`tablecell: ${content} ${flags}\n`);

// Inline level renderer overrides
renderer.strong =
    text => {
        console.log(`strong: ${text}\n`);
        return `**${text}**`;
    };
renderer.em =
    text => {
        console.log(`em: ${text}\n`);
        return `_${text}_`;
    };
renderer.codespan =
    code => console.log(`codespan: ${code}\n`);
renderer.br = 
    () => {
        console.log('br');
        return `\n`;
    };
renderer.del =
    text => console.log(`del: ${text}\n`);
renderer.link =
    (href, title, text) => {
        console.log(`link: ${href} ${title} ${text}\n`);
        return `[${text}](${href})`;
    };
renderer.image =
    (href, title, text) => {
        console.log(`image: ${href} ${title} ${text}\n`);
        return adaptiveCardHelper.createImage(href, {
            altText: text
        });
    };
renderer.text =
    text => {
        console.log(`text: ${text}\n`);
        return `${decodeURIComponent(text)}`;
    };

module.exports = renderer;