// module.exports = function(source) {
//   // 使用正则表达式来查找和替换标记的 import() 调用
//   return source.replace(
//     /\/\*\s*TARO_ASYNC_IMPORT\s*\*\/\s*import\((.*?)\)/g,
//     '__non_webpack_require__.async($1)'
//   );
// };
