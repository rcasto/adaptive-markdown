# adaptive-markdown
Convert markdown into [Adaptive Cards](https://adaptivecards.io/).

The goal of this project is to take advantage of the rendering surface of Adaptive Cards, but ease the authoring experience for creating them.  It is much easier and more expressive for most folks (in my opinion) to write in markdown than it is to do so in JSON.

## Usage
One way to use this transformer is to download one of the pre-built binaries.  There are [binaries for Windows, Mac OS, and Linux](https://github.com/rcasto/adaptive-markdown/tree/master/binaries).

Once you have downloaded a binary you can use it as follows:
```
./<path-to-binary>/transform-linux <path-to-markdown-file>
```

Another way to use this transformer requires you have [Node.js](https://nodejs.org/en/) installed.  You can then run the [transform script within the repository](https://github.com/rcasto/adaptive-markdown/blob/master/transform.js).

```
node <path-to-transform-js>/transform.js <path-to-markdown-file>
```

## Current Status
Below is a table containing the current status of all markdown elements.  There are caveats for some items and in these cases they will be called out.

Markdown element | Status
---------------- | ------
code             | Unsupported
blockquote       | Unsupported
html             | Unsupported
heading          | Supported
hr               | Unsupported
list             | Supported with caveats (to be called out)
listitem         | Supported with caveats (to be called out)
paragraph        | Supported
table            | Unsupported
tablerow         | Unsupported
tablecell        | Unsupported
strong           | Supported
em               | Supported
codespan         | Unsupported
br               | Supported
del              | Unsupported
link             | Supported
image            | Supported
text             | Supported