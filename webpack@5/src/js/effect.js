//副作用

Number.prototype.pad = function (size) {
  let res = this + "";
  while (res.length < size) {
    res = "0" + res;
  }
  return res;
};
