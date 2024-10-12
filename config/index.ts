const path = require('path');

const base = 'pages/base/index';

const config = {
  projectName: 'taro-optimisation-demo',
  date: '2024-10-8',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: 'webpack4',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain, webpack) {
      chain.resolve.alias
      .set('pages/base/index', path.resolve(__dirname, '../src/pages/base/index'))
      chain.merge({
        optimization: {
          splitChunks: {
            cacheGroups: {
              [base]: {
                name: base ,
                test: /pages\/base\/index/,
                priority: 50,
              },
            },          
          },
        },
      });


      chain.module
      .rule('script')
      .use('taro-dynamic-import-loader')
      .loader(path.resolve(__dirname, './taro-dynamic-import-loader.js'))
      .end()
      // .use('taro-dynamic-import-post-loader')
      // .loader(path.resolve(__dirname, './taro-dynamic-import-post-loader.js'))
      // .end();

      console.log(path.resolve(__dirname, '../src/pages/base/index'), '====>')
    },
    addChunkPages (pages) {
      console.log('<========================================pages=======================================>', pages);
      pages.set('pages/index/index', [base]);
      // pages.set('pages/index/index', [commonMapSE]);
      // pages.set('pages/index/index', [commonMapSE]);
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  uglify: {
    enable: false,
  },
  // 如果你的 Taro 版本使用 terser 而不是 uglify，可以这样设置：
  terser: {
    enable: false,
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
