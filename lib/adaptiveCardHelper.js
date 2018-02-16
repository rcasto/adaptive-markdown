var adaptiveCards = require('adaptivecards');

function createTextBlock(text, options) {
    var textBlock = new adaptiveCards.TextBlock();
    textBlock.text = text || '';
    textBlock.wrap = true;
    setOptions(textBlock, options);
    return textBlock;
}

function createImage(url, options) {
    var image = new adaptiveCards.Image();
    image.url = url;
    setOptions(image, options);
    return image;
}

// Wrap adaptive card elements in a container
function wrap(elements) {
    if (!Array.isArray(elements)) {
        elements = elements ? [elements] : [];
    }
    var container = new adaptiveCards.Container();
    elements.forEach(element => container.addItem(element));
    return container;
}

function setOptions(obj, options) {
    Object.keys(options || {})
        .forEach(optionKey => {
            obj[optionKey] = options[optionKey];
        });
}

module.exports = {
    createTextBlock,
    createImage,
    wrap
};