"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/*
* 双端队列，可以同时从队首和队尾添加或移除元素的特殊队列。
* 同时遵循了先进先出和后进先出的原则，相当于结合了队列和栈。
*/
var Deque = /*#__PURE__*/function () {
  function Deque() {
    _classCallCheck(this, Deque);

    this.count = 0; //累计索引

    this.lowestCount = 0; //队首位置

    this.items = {}; //容器
  }

  _createClass(Deque, [{
    key: "addFront",
    value: function addFront(el) {
      if (this.isEmpty()) {
        this.addBack(el);
      }

      if (this.lowestCount > 0) {
        this.lowestCount--;
        this.items[lowestCount] = el;
      }

      if (this.lowestCount === 0) {
        for (var i = 0; i < this.count; i++) {
          this.items[i] = this.items[i - 1];
        }

        this.count++;
        this.lowestCount = 0;
        this.items[0] = el;
      }
    }
  }, {
    key: "addBack",
    value: function addBack() {
      this.items[this.count] = el;
      this.count++;
    }
  }, {
    key: "removeFront",
    value: function removeFront() {
      if (this.isEmpty()) {
        return undefined;
      }

      var targetItem = this.items[this.lowestCount];
      delete this.items[this.lowestCount];
      this.lowestCount++;
      return targetItem;
    }
  }, {
    key: "removeBack",
    value: function removeBack() {
      if (this.isEmpty()) {
        return undefined;
      }

      this.count--;
      var targetItem = this.items[this.count];
      delete this.items[this.count];
      return targetItem;
    }
  }, {
    key: "peekFront",
    value: function peekFront() {
      if (this.isEmpty()) {
        return undefined;
      }

      return this.items[this.lowestCount];
    }
  }, {
    key: "peekBack",
    value: function peekBack() {
      if (this.isEmpty()) {
        return undefined;
      }

      return this.items[this.count - 1];
    }
  }, {
    key: "clear",
    value: function clear() {
      this.count = 0;
      this.lowestCount = 0;
      this.items = {};
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.isEmpty()) {
        return undefined;
      }

      var objString = "".concat(this.items[this.lowestCount]);

      for (var i = this.lowestCount + 1; i < this.count; i++) {
        objString = "".concat(objString, ",").concat(this.items[i]);
      }

      return objString;
    }
  }, {
    key: "size",
    value: function size() {
      return this.count - this.lowestCount;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.count - this.lowestCount === 0;
    }
  }]);

  return Deque;
}();