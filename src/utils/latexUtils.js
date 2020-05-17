const replaceAll = (expression, search, replacement) => (
  expression.split(search).join(replacement)
);

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

export { cleanLatex };
