var marked = require('marked');
var adaptiveCardHelper = require('./adaptiveCardHelper');
var markdownHelper = require('./markdownHelper');

var renderer = new marked.Renderer();

// If something does not have a render function defined for it then it falls
// back to the default marked Renderer behavior

// Block Level render overrides
renderer.code = 
    (code, language) => console.log(`code: ${code} ${language}`);
renderer.blockquote = 
    quote => console.log(`blockquote: ${quote}`);
renderer.html = 
    html => console.log(`html: ${html}`);
renderer.heading = 
    (textBlock, level) => {
        console.log(`heading: ${JSON.stringify(textBlock)} ${level}`);
        textBlock.text = markdownHelper.toHeading(textBlock.text, level);
        return textBlock; 
    };
renderer.hr = 
    () => console.log(`hr`);
renderer.list = 
    (body, ordered) => console.log(`list: ${body} ${ordered}`);
renderer.listitem =
    text => console.log(`listitem: ${JSON.stringify(text)}`);
renderer.paragraph = 
    cardElems => {
        console.log(`paragraph: ${JSON.stringify(cardElems)}`)
        return adaptiveCardHelper.wrap(cardElems);
    };
renderer.table =
    (header, body) => console.log(`table: ${header} ${body}`);
renderer.tablerow =
    content => console.log(`tablerow: ${content}`);
renderer.tablecell =
    (content, flags) => console.log(`tablecell: ${content} ${flags}`);

// Inline level renderer overrides
renderer.strong =
    text => {
        console.log(`strong: ${text}`);
        return `**${text}**`;
    };
renderer.em =
    text => {
        console.log(`em: ${text}`);
        return `_${text}_`;
    };
renderer.codespan =
    code => console.log(`codespan: ${code}`);
renderer.br = 
    () => {
        console.log('br');
        return `\n`;
    };
renderer.del =
    text => console.log(`del: ${text}`);
renderer.link =
    (href, title, text) => {
        console.log(`link: ${href} ${title} ${text}`);
        return `[${text}](${href})`;
    };
renderer.image =
    (href, title, text) => {
        console.log(`image: ${href} ${title} ${text}`);
        return adaptiveCardHelper.createImage(href, {
            altText: text
        });
    };
renderer.text =
    text => {
        console.log(`text: ${text}`);
        return `${decodeURIComponent(text)}`;
    };

module.exports = renderer;