const replaceAll = (expression, search, replacement) => {
  if (expression) {
    return expression.split(search).join(replacement);
  }
  return expression;
};

const cleanLatex = (latex) => {
  if (!latex) {
    return latex;
  }

  let clean = replaceAll(latex, '\\left(', '(');
  clean = replaceAll(clean, 'left(', '(');
  clean = replaceAll(clean, '\\right)', ')');
  clean = replaceAll(clean, '\\cdot ', '*');
  clean = replaceAll(clean, 'cdot ', '*');
  clean = replaceAll(clean, 'sen', '\\sin');
  clean = replaceAll(clean, '.', '*');
  clean = replaceAll(clean, '\\ ', '');
  return clean;
};

const cleanExpression = (expression, isMathQuill) => {
  // TODO: this is becuase a Mathquill issue: https://github.com/mathquill/mathquill/issues/784
  let cleanedExpression;
  if (isMathQuill) {
    cleanedExpression = replaceAll(expression, '\\int', '\\int_{\\ }^{\\ }');
  } else {
    cleanedExpression = replaceAll(expression, '\\int_{\\ }^{\\ }', '\\int ');
  }

  return cleanedExpression;
};

module.exports = {
  cleanExpression,
  cleanLatex,
  replaceAll
};
