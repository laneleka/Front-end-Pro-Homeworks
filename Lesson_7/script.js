const MIN_LENGTH = 2;
const MAX_LENGTH = 10;
const MINIMUM_MIN_VALUE = -10;
const MAXIMUM_MIN_VALUE = 10;
const MAXIMUM_MAX_VALUE = 50;

let arrLength;
let minValue;
let maxValue;

do {
  arrLength = +prompt('Please, enter length of array from 2 to 10 inclusive');

  if (!arrLength || isNaN(arrLength)) {
    arrLength = 0;
    continue;
  }

  if (arrLength < 0) {
    arrLength = Math.abs(arrLength);
  }

  if (arrLength % 1 !== 0) {
    arrLength = Math.round(arrLength);
  }

} while (!arrLength || arrLength < MIN_LENGTH || arrLength > MAX_LENGTH)

const arr = new Array(arrLength);

do {
  minValue = prompt('Please, enter value for MINIMUM of random element from -10 to 10 inclusive');
  
  if (!minValue || isNaN(minValue)) {
    minValue = 0;
    continue;
  }

  if (minValue % 1 !== 0) {
    minValue = Math.round(minValue);
  }

} while (!minValue || minValue < MINIMUM_MIN_VALUE || minValue > MAXIMUM_MIN_VALUE)


do {
  maxValue = prompt(`Please, enter value for MAXIMUM of random element from ${minValue} to 50 inclusive`);

  if (!maxValue || isNaN(maxValue)) {
    maxValue = 0;
    continue;
  }

  if (maxValue % 1 !== 0) {
    maxValue = Math.round(maxValue);
  }

} while (!maxValue || maxValue < minValue || maxValue > MAXIMUM_MAX_VALUE)


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < arr.length; i++) {
  arr[i] = getRandomIntInclusive(+minValue, +maxValue);
}

let minElement = maxElement = arr[0];

for (let i = 1; i < arr.length; i++) {
  if (arr[i] < minElement) {
    minElement = arr[i];
  }

  if (arr[i] > maxElement) {
    maxElement = arr[i];
  }
}

let indexOfMin = arr.lastIndexOf(minElement);
let indexOfMax = arr.lastIndexOf(maxElement);

arr[indexOfMin] = maxElement;
arr[indexOfMax] = minElement;


console.log('arr', arr);
console.log('minEl', minElement);
console.log('maxEl', maxElement);
console.log('indexOfMin', indexOfMin);
console.log('indexOfMax', indexOfMax);
