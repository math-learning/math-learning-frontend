// TODO: How to do this right ?
// eslint-disable-next-line
export const MathQuill = require('exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery!mathquill/build/mathquill.js');

export const MQ = MathQuill.getInterface(2);
