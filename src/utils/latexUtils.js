// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = (search, replacement) => {
  const target = this;
  return target.split(search).join(replacement);
};

const cleanLatex = (latex) => {
  let clean = latex.replaceAll('\\left(', '(');
  clean = clean.replaceAll('left(', '(');
  clean = clean.replaceAll('\\right)', ')');
  clean = clean.replaceAll('\\cdot ', '*');
  clean = clean.replaceAll('cdot ', '*');
  clean = clean.replaceAll('.', '*');
  clean = clean.replaceAll('sen', '\\sin');
  clean = clean.replaceAll('\\ ', '');
  return clean;
};

export default {
  cleanLatex,
};
