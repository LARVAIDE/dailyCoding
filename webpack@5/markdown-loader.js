const marked = require("marked");

module.exports = (source) => {
  // console.log(source)
  const tokens = marked.lexer(source);
  const transformed_html = marked.parser(tokens);
  return `export default ${JSON.stringify(transformed_html)}`;
};
