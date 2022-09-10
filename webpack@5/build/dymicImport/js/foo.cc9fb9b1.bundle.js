(self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || []).push([
  ["foo"],
  {
    "./src/js/foo.js":
      /*!***********************!*\
      !*** ./src/js/foo.js ***!
      \***********************/
      function (module) {
        module.exports = "懒加载分析";
      },
  },
]);
