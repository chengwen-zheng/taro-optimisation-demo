module.exports = function({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (t.isImport(path.node.callee)) {
          const arg = path.node.arguments[0];
          
          if (t.isStringLiteral(arg)) {
            // 添加一个特殊的注释来标记这个 import() 调用
            path.addComment('leading', 'TARO_ASYNC_IMPORT');
          }
        }
      }
    }
  };
};
