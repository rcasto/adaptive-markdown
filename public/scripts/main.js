var tokenTypes = {
    paragraph: 'paragraph'
};

function debounce(func, debounceTimeoutInMs) {
    var timeoutId = null;
    var that = this;
    return function () {
        var args = arguments;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            func.apply(that, args);
            timeoutId = null;
        }, debounceTimeoutInMs);
    };
}

function processTokens(tokens) {
    tokens.forEach(token => console.log(token));
}

function stoppedTyping(textArea) {
    var text = textArea.value;
    if (!text) {
        return;
    }
    fetch('/api/markdown', {
        method: 'POST',
        body: text
    })
    .then(response => response.json())
    .then(processTokens)
    .catch(error => console.error(error));
}

var debounceStoppedTyping = debounce(stoppedTyping, 1000);