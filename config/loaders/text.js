module.exports = function(source) {
  const cleanText = source
    .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, '')
    .replace(/'/g, "\\'");
  return `module.exports = \'${cleanText}\'`;
};
