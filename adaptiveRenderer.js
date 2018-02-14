var marked = require('marked');
var renderer = new marked.Renderer();

// If something does not have a render function defined for it then it falls
// back to the default marked Renderer behavior

renderer.paragraph = (text) => {
    return `bling ${text} bling`;
};
renderer.br = () => ({ 'blah': 'huh' });

module.exports = renderer;