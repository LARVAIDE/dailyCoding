const { sum, substract } = require('./1');

test('1加2等于3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('3减2等于1', () => {
  expect(substract(3, 2)).toBe(1);
});
