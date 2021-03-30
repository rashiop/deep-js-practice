// TODO: write the validation functions

function isValidName(name) {
  const isString = typeof name === 'string';
  const notEmpty = Boolean(name);
  const minThreeChar = `${name}`.trim().length > 3;
  return isString && notEmpty && minThreeChar;
}

function hoursAttended(attended, length) {
  const numberValid = isValidNumber(attended) && isValidNumber(length);
  if (!numberValid) {
    return false;
  }
  return +attended <= +length;

  function isValidNumber(input) {
    const typeStringOrNumber =
      typeof input === 'number' ||
      (typeof input === 'string' && input.trim().length > 0);
    if (!typeStringOrNumber) {
      return false;
    }

    const inputNumber = Number(input);
    if (isNaN(inputNumber)) {
      return false;
    }
    if (inputNumber < 0) {
      return false;
    }
    if (inputNumber != Math.floor(inputNumber)) {
      return false;
    }
    return true;
  }
}

// tests:
console.log(isValidName('Frank') === true);
console.log(hoursAttended(6, 10) === true);
console.log(hoursAttended(6, '10') === true);
console.log(hoursAttended('6', 10) === true);
console.log(hoursAttended('6', '10') === true);
console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName('') === false);
console.log(isValidName('  \t\n') === false);
console.log(isValidName('X') === false);
console.log(hoursAttended('', 6) === false);
console.log(hoursAttended(6, '') === false);
console.log(hoursAttended('', '') === false);
console.log(hoursAttended('foo', 6) === false);
console.log(hoursAttended(6, 'foo') === false);
console.log(hoursAttended('foo', 'bar') === false);
console.log(hoursAttended(null, null) === false);
console.log(hoursAttended(null, undefined) === false);
console.log(hoursAttended(undefined, null) === false);
console.log(hoursAttended(undefined, undefined) === false);
console.log(hoursAttended(false, false) === false);
console.log(hoursAttended(false, true) === false);
console.log(hoursAttended(true, false) === false);
console.log(hoursAttended(true, true) === false);
console.log(hoursAttended(10, 6) === false);
console.log(hoursAttended(10, '6') === false);
console.log(hoursAttended('10', 6) === false);
console.log(hoursAttended('10', '6') === false);
console.log(hoursAttended(6, 10.1) === false);
console.log(hoursAttended(6.1, 10) === false);
console.log(hoursAttended(6, '10.1') === false);
console.log(hoursAttended('6.1', 10) === false);
console.log(hoursAttended('6.1', '10.1') === false);
