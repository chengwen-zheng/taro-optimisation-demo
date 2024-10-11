
var path = require('path');
// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
      'dynamic-import-node': false,
    }]
  ],
   // 添加我们的自定义插件
  plugins: [
    path.resolve(__dirname, './config/babel-plugin-transform-async-import.js')
  ]
}
