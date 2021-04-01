// TODO: write `findAll(..)`

function findAll(match, array) {
  if (Array.isArray(array)) {
    return array.reduce(reduceMatches, []);

    function reduceMatches(matches, arr) {
      if (Object.is(arr, match)) {
        matches.push(match);
      } else if (arr == null && match == null) {
        matches.push(arr);
      } else if (
        typeof arr == 'number' &&
        typeof match == 'number' &&
        isNaN(arr) &&
        isNaN(match)
      ) {
        matches.push(match);
      } else if (
        typeof arr == 'string' &&
        typeof match == 'number' &&
        arr.trim().length > 0 &&
        arr == match &&
        !(Object.is(match, -0) || Object.is(arr, -0)) &&
        !(Object.is(match(Infinity, arr)) || Object.is(match(-Infinity, arr)))
      ) {
        matches.push(match);
      } else if (
        typeof arr == 'number' &&
        typeof match == 'string' &&
        match.trim().length > 0 &&
        arr == match &&
        !(Object.is(match, -0) || Object.is(arr, -0))
      ) {
        matches.push(match);
      }
      return matches;
    }
  }

  return false;
}

// tests:
var myObj = { a: 2 };

var values = [
  null,
  undefined,
  -0,
  0,
  13,
  42,
  NaN,
  -Infinity,
  Infinity,
  'Infinity',
  '',
  '0',
  '42',
  '42hello',
  'true',
  'NaN',
  true,
  false,
  myObj,
];

console.log(setsMatch(findAll(null, values), [null, undefined]) === true);
console.log(setsMatch(findAll(undefined, values), [null, undefined]) === true);
console.log(setsMatch(findAll(0, values), [0, '0']) === true);
console.log(setsMatch(findAll(-0, values), [-0]) === true);
console.log(setsMatch(findAll(NaN, values), [NaN]) === true);
console.log(setsMatch(findAll(true, values), [true]) === true);
console.log(setsMatch(findAll(false, values), [false]) === true);
console.log(setsMatch(findAll('false', values), [false]) === false);
console.log(setsMatch(findAll(true, values), [true, 'true']) === false);
console.log(setsMatch(findAll(true, values), [true, 1]) === false);
console.log(setsMatch(findAll(false, values), [false, 0]) === false);

console.log(setsMatch(findAll(13, values), [13]) === true);
console.log(setsMatch(findAll(42, values), [42, '42']) === true);
console.log(setsMatch(findAll(-Infinity, values), [-Infinity]) === true);
console.log(setsMatch(findAll(Infinity, values), [Infinity]) === true);
console.log(setsMatch(findAll('', values), ['']) === true);
console.log(setsMatch(findAll('0', values), [0, '0']) === true);
console.log(setsMatch(findAll('42', values), [42, '42']) === true);
console.log(setsMatch(findAll('42hello', values), ['42hello']) === true);
console.log(setsMatch(findAll('true', values), ['true']) === true);
console.log(setsMatch(findAll(myObj, values), [myObj]) === true);

console.log(setsMatch(findAll(null, values), [null, 0]) === false);
console.log(setsMatch(findAll(undefined, values), [NaN, 0]) === false);
console.log(setsMatch(findAll(25, values), [25]) === false);
console.log(
  setsMatch(findAll(Infinity, values), [Infinity, -Infinity]) === false,
);
console.log(setsMatch(findAll('', values), ['', 0]) === false);

console.log(setsMatch(findAll(0, values), [0, '0', -0]) === false);
console.log(setsMatch(findAll(42, values), [42, '42', '42hello']) === false);

// ***************************

function setsMatch(arr1, arr2) {
  if (
    Array.isArray(arr1) &&
    Array.isArray(arr2) &&
    arr1.length == arr2.length
  ) {
    for (let v of arr1) {
      if (!arr2.includes(v)) return false;
    }
    return true;
  }
  return false;
}
