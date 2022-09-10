module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  /**
   * 继承一些共享配置
   */
  extends: ["standard", "eslint:recommended", "plugin:react/recommended"],
  overrides: [],
  /**
   * parserOptions 里面的配置仅提供语法检测，具体可使用哪些成员要是依赖于`env`
   */
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: 0, // 结尾分号
  },
  plugins: ["react"],
};
