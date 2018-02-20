var marked = require('marked');
var adaptiveCardHelper = require('./adaptiveCardHelper');

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
    (blocks, level) => {
        console.log(`heading: ${JSON.stringify(blocks)} ${level}\n`);
        var text = blocks
            .filter(block => adaptiveCardHelper.isCardType(block, adaptiveCardHelper.types.textBlock))
            .reduce((accum, currBlock) => {
                return accum + currBlock.text;
            }, '');
        return adaptiveCardHelper.createHeadingTextBlock(text, level);
    };
renderer.hr = 
    () => console.log(`hr\n`);
renderer.list = 
    (blockLists, ordered) => {
        var list = (blockLists || [])
            .map((blockList, i) => {
                if (adaptiveCardHelper.isCardType(blockList[0], adaptiveCardHelper.types.textBlock)) {
                    blockList[0].text = (ordered ? `${i + 1}. ` : `- `) + blockList[0].text;
                }
                return blockList;
            })
            // flatten into one list
            .reduce((accum, blockList) => {
                return accum.concat(blockList);
            }, []);
        return adaptiveCardHelper.wrap(list);
    };
renderer.listitem =
    blocks => {
        var listItem = [];
        var currTextBlock = adaptiveCardHelper.createTextBlock();
        (blocks || []).forEach(block => {
            switch (block.type) {
                case adaptiveCardHelper.types.textBlock:
                    currTextBlock.text += block.text;
                    break;
                case adaptiveCardHelper.types.container:
                    let listElems = adaptiveCardHelper.unwrap(block);
                    listElems
                        .forEach(listElem => {
                            if (adaptiveCardHelper.isCardType(listElem, adaptiveCardHelper.types.textBlock)) {
                                currTextBlock.text += '\r\t' + listElem.text;
                            } else {
                                listItem.push(listElem);
                            }
                        });
                    break;
                case adaptiveCardHelper.types.image:
                    listItem.push(block);
                    break;
                default:
                    console.error(`Unhandled block type: ${blockType} - ${JSON.stringify(block)}`);
            }
        });
        if (currTextBlock.text) {
            listItem.unshift(currTextBlock);
        }
        return listItem;
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
    blocks => {
        console.log(`strong: ${JSON.stringify(blocks)}\n`);
        var text = blocks
            .filter(block => adaptiveCardHelper.isCardType(block, adaptiveCardHelper.types.textBlock))
            .reduce((accum, currBlock) => {
                return accum + currBlock.text;
            }, '')
        console.log(text);
        return `**${text}**`;
    };
renderer.em =
    blocks => {
        console.log(`em: ${blocks}\n`);
        var text = blocks
            .filter(block => adaptiveCardHelper.isCardType(block, adaptiveCardHelper.types.textBlock))
            .reduce((accum, currBlock) => {
                return accum + currBlock.text;
            }, '');
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
    (href, title, blocks) => {
        console.log(`link: ${href} ${title} ${blocks}\n`);
        var text = blocks
            .filter(block => adaptiveCardHelper.isCardType(block, adaptiveCardHelper.types.textBlock))
            .reduce((accum, currBlock) => {
                return accum + currBlock.text;
            }, '');
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