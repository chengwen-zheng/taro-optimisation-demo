module.exports = function({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        if (t.isImport(path.node.callee)) {
          const arg = path.node.arguments[0];
          
          if (t.isStringLiteral(arg)) {
            // 创建 __non_webpack_require__.async 调用
            const nonWebpackRequireAsync = t.callExpression(
              t.memberExpression(
                t.identifier('__non_webpack_require__'),
                t.identifier('async')
              ),
              path.node.arguments
            );
            
            path.replaceWith(nonWebpackRequireAsync);
          }
        }
      }
    }
  };
};
