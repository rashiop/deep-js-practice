// TODO: define polyfill for `Object.is(..)`
if (!Object.is || true) {
  Object.is = function ObjectIs(x, y) {
    const isXNegZero = isItNegZero(x);
    const isYNegZero = isItNegZero(y);
    const isXNaN = isItNaN(x);
    const isYNaN = isItNaN(y);

    if (isXNegZero || isYNegZero) {
      return isXNegZero && isYNegZero;
    } else if (isXNaN || isYNaN) {
      return isXNaN && isYNaN;
    } else {
      return x === y;
    }

    function isItNegZero(v) {
      return v === 0 && 1 / v === -Infinity;
    }

    function isItNaN(v) {
      return typeof v === 'number' && isNaN(v);
    }
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is('foo', 'foo') === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, '42') === false);
console.log(Object.is('42', 42) === false);
console.log(Object.is('foo', 'bar') === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
