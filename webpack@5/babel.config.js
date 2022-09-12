module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        /**
         * false-不使用polyfill；
         * usage-依据代码里的新语法进行填充；
         * entry-依据browserlist筛选的浏览器进行填充。
         *
         * 在需要使用polyfill的代码里手动引入"core-js/stable"
         */
        useBuiltIns: 'entry',
        corejs: 3
      }
    ],
    ['@babel/preset-react']
  ],
  plugins: [['@babel/plugin-syntax-dynamic-import']]
};
