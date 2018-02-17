// This is wrong and will need to fix, Adaptive Cards do not support markdown headings
// Will need to modify the textblock to adjust size and weight
function toHeading(str, level) {
    return `${'#'.repeat(level)} ${str}`;
}

module.exports = {
    toHeading
};