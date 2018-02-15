var marked = require('marked');
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
    (text, level) => console.log(`heading: ${text} ${level}`);
renderer.hr = 
    () => console.log(`hr`);
renderer.list = 
    (body, ordered) => console.log(`list: ${body} ${ordered}`);
renderer.listitem =
    text => console.log(`listitem: ${text}`);
renderer.paragraph = 
    text => {
        console.log(`text: ${text}`);
        return `bling ${text} bling`;
    };
renderer.table =
    (header, body) => console.log(`table: ${header} ${body}`);
renderer.tablerow =
    content => console.log(`tablerow: ${content}`);
renderer.tablecell =
    (content, flags) => console.log(`tablecell: ${content} ${flags}`);

// Inline level renderer overrides
renderer.strong =
    text => console.log(`strong: ${text}`);
renderer.em =
    text => console.log(`em: ${text}`);
renderer.codespan =
    code => console.log(`codespan: ${code}`);
renderer.br = 
    () => console.log('br');
renderer.del =
    text => console.log(`del: ${text}`);
renderer.link =
    (href, title, text) => console.log(`link: ${href} ${title} ${text}`);
renderer.image =
    (href, title, text) => console.log(`image: ${href} ${title} ${text}`);
renderer.text =
    text => console.log(`text: ${text}`);

module.exports = renderer;