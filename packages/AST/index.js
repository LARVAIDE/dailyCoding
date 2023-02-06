const parser = require("@babel/parser");
const types = require("@babel/types");
const generator = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;

function compile(code) {
    const ast = parser.parse(code);
    traverse(ast, {
        Identifier(path){
            var {node} = path;
            if(node && node.name === "lastdayLoginUsr"){
                var newNode = types.identifier("a"); // 创建目标节点
                path.replaceWith(newNode);  // 替换原始节点
                path.stop();
            }
        }    
    });
    return generator(ast, {}, code);
}

const code = `
  const lastdayLoginUsr = 180;
  console.log(c)
  `;
const newCode = compile(code)
console.log(newCode)