// * FREQUENCY COUNTERS
// 빈도수 세기 패턴

// This pattern uses objects or sets to collect values/frequencies of values
// This can often avoid the need for nested loops or O(N^2) operations with arrays/strings

function validAnagram(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  let lookup = {};

  for (const letter of a) {
    lookup[letter] = lookup[letter] ? (lookup[letter] += 1) : 1;
  }
  for (const letter of b) {
    if (lookup[letter]) {
      lookup[letter] -= 1;
    } else {
      return false;
    }
  }
  return true;
}

validAnagram("", "");
validAnagram("aaz", "zza");
validAnagram("anagram", "nagaram");
console.clear();

// SAME FREQUENCY
// Given two positive integers, find out if the two numbers have the same frequency of digits.
// Time complexity: O(N)

function sameFrequency(first, second) {
  if (first.toString().length !== second.toString().length) {
    return false;
  }
  let lookup = {};
  for (const num of first.toString()) {
    lookup[num] = lookup[num] ? (lookup[num] += 1) : 1;
  }
  for (const num of second.toString()) {
    if (lookup[num]) {
      lookup[num] -= 1;
    } else {
      return false;
    }
  }
  console.log(`first: ${first}, second: ${second}, return: true`);
  return true;
}

// Sample input:
sameFrequency(182, 281); // true
sameFrequency(32, 14); // false
sameFrequency(3589578, 5879385); // true
sameFrequency(22, 222); // false

// Colt's Solution
function sameFrequency(num1, num2) {
  let strNum1 = num1.toString();
  let strNum2 = num2.toString();
  if (strNum1.length !== strNum2.length) return false;

  let countNum1 = {};
  let countNum2 = {};

  for (let i = 0; i < strNum1.length; i++) {
    countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1;
  }

  for (let j = 0; j < strNum1.length; j++) {
    countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1;
  }

  for (let key in countNum1) {
    if (countNum1[key] !== countNum2[key]) return false;
  }

  return true;
}

// Implement a function called, areThereDuplicates which accepts a variable number of arguments,
// and checks whether there are any duplicates among the arguments passed in.
// You can solve this using the frequency counter pattern OR the multiple pointers pattern.

// Restrictions:
// Time - O(n)
// Space - O(n)

// Bonus:
// Time - O(n log n)
// Space - O(1)

// frequency counter pattern
function areThereDuplicatesFC() {
  if (!arguments.length) return false;
  let lookup = {};
  for (let arg of arguments) {
    lookup[arg] ? (lookup[arg] += 1) : (lookup[arg] = 1);
  }
  for (let val in lookup) {
    if (lookup[val] > 1) return true;
  }
  return false;
}

// Examples:
console.log(areThereDuplicatesFC(1, 2, 3)); // false
console.log(areThereDuplicatesFC(1, 2, 2)); // true
console.log(areThereDuplicatesFC("a", "b", "c", "a")); // true

// Colt's Solution
// frequency counter pattern

function areThereDuplicates() {
  let collection = {};
  for (let val in arguments) {
    collection[arguments[val]] = (collection[arguments[val]] || 0) + 1;
  }
  for (let key in collection) {
    if (collection[key] > 1) return true;
  }
  return false;
}

// multiple pointers pattern

function areThereDuplicates(...args) {
  // Two pointers
  args.sort((a, b) => a > b);
  let start = 0;
  let next = 1;
  while (next < args.length) {
    if (args[start] === args[next]) {
      return true;
    }
    start++;
    next++;
  }
  return false;
}

// one liner pattern

function areThereDuplicates() {
  return new Set(arguments).size !== arguments.length;
}
