var marked = require('marked');
var adaptiveCardHelper = require('./adaptiveCardHelper');

function AdaptiveInlineLexer(links, options, renderer) {
    marked.InlineLexer.call(this, links, options, renderer);
}
AdaptiveInlineLexer.prototype = Object.create(marked.InlineLexer.prototype);

AdaptiveInlineLexer.prototype.output = function (src) {
    var out = []
        , link
        , text
        , href
        , cap;
    var currTextBlock = adaptiveCardHelper.createTextBlock();

    while (src) {
        // escape
        if (cap = this.rules.escape.exec(src)) {
            src = src.substring(cap[0].length);
            currTextBlock.text += cap[1];
            continue;
        }

        // autolink
        if (cap = this.rules.autolink.exec(src)) {
            src = src.substring(cap[0].length);
            if (cap[2] === '@') {
                text = escape(
                    cap[1].charAt(6) === ':'
                        ? this.mangle(cap[1].substring(7))
                        : this.mangle(cap[1])
                );
                href = this.mangle('mailto:') + text;
            } else {
                text = escape(cap[1]);
                href = text;
            }
            currTextBlock.text += this.renderer.link(href, null, text);
            continue;
        }

        // url (gfm)
        if (!this.inLink && (cap = this.rules.url.exec(src))) {
            src = src.substring(cap[0].length);
            text = escape(cap[1]);
            href = text;
            currTextBlock.text += this.renderer.link(href, null, text);
            continue;
        }

        // tag
        if (cap = this.rules.tag.exec(src)) {
            if (!this.inLink && /^<a /i.test(cap[0])) {
                this.inLink = true;
            } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
                this.inLink = false;
            }
            src = src.substring(cap[0].length);
            currTextBlock.text += this.options.sanitize
                ? this.options.sanitizer
                    ? this.options.sanitizer(cap[0])
                    : escape(cap[0])
                : cap[0]
            continue;
        }

        // link
        if (cap = this.rules.link.exec(src)) {
            src = src.substring(cap[0].length);
            this.inLink = true;
            link = this.outputLink(cap, {
                href: cap[2],
                title: cap[3]
            });
            if (typeof link === 'object') {
                out.push(currTextBlock);
                out.push(link);
                currTextBlock = adaptiveCardHelper.createTextBlock();
            } else {
                currTextBlock.text += link;
            }
            this.inLink = false;
            continue;
        }

        // reflink, nolink
        if ((cap = this.rules.reflink.exec(src))
            || (cap = this.rules.nolink.exec(src))) {
            src = src.substring(cap[0].length);
            link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
            link = this.links[link.toLowerCase()];
            if (!link || !link.href) {
                currTextBlock.text += cap[0].charAt(0);
                src = cap[0].substring(1) + src;
                continue;
            }
            this.inLink = true;
            link = this.outputLink(cap, link);
            if (typeof link === 'object') {
                out.push(currTextBlock);
                out.push(link);
                currTextBlock = adaptiveCardHelper.createTextBlock();
            } else {
                currTextBlock.text += link;
            }
            this.inLink = false;
            continue;
        }

        // strong
        if (cap = this.rules.strong.exec(src)) {
            src = src.substring(cap[0].length);
            currTextBlock.text += this.renderer.strong(this.output(cap[2] || cap[1]));
            continue;
        }

        // em
        if (cap = this.rules.em.exec(src)) {
            src = src.substring(cap[0].length);
            currTextBlock.text += this.renderer.em(this.output(cap[2] || cap[1]));
            continue;
        }

        // code
        if (cap = this.rules.code.exec(src)) {
            src = src.substring(cap[0].length);
            currTextBlock.text += this.renderer.codespan(escape(cap[2].trim(), true));
            continue;
        }

        // br
        if (cap = this.rules.br.exec(src)) {
            src = src.substring(cap[0].length);
            out.push(currTextBlock);
            currTextBlock = adaptiveCardHelper.createTextBlock('', {
                spacing: 'none'
            });
            continue;
        }

        // del (gfm)
        if (cap = this.rules.del.exec(src)) {
            src = src.substring(cap[0].length);
            currTextBlock.text += this.renderer.del(this.output(cap[1]));
            continue;
        }

        // text
        if (cap = this.rules.text.exec(src)) {
            src = src.substring(cap[0].length);
            currTextBlock.text += this.renderer.text(escape(this.smartypants(cap[0])));
            continue;
        }

        if (src) {
            throw new
                Error('Infinite loop on byte: ' + src.charCodeAt(0));
        }
    }

    if (currTextBlock.text) {
        out.push(currTextBlock);
    }

    return out;
};

module.exports = AdaptiveInlineLexer;