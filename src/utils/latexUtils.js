String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
  };

let cleanLatex   = (latex) => {
    let clean = latex.replaceAll("\\left(","(");
    clean = clean.replaceAll("\\right)",")");
    clean = clean.replaceAll("\\ ","")
    clean = clean.replaceAll("\\cdot ","*")
    clean = clean.replaceAll("cdot ","*")
    clean = clean.replaceAll(".","*")
    clean = clean.replaceAll("sen","\\sin")
    return clean;
  }

export {cleanLatex}