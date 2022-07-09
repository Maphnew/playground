# ALGORITHM

## FREQUENCY COUNTERS

<빈도수 세기 패턴>

- This pattern uses objects or sets to collect values/frequencies of values
- This can often avoid the need for nested loops or O(N^2) operations with arrays/strings

### AN EXAMPLE called same

- Write a function called same, which accepts two arrays. The function should return true if every value in the array has it's corresponding value squared in the second array. The frequency of values must be the same.

```js
same([1, 2, 3], [4, 1, 9]); // true
same([1, 2, 3], [1, 9]); // false
same([1, 2, 1], [4, 4, 1]); // false (must be same frequency)
```

#### A NAIVE SOLUTION

- Time Complexity - N^2

```js
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }
  return true;
}
```

#### REFACTORED

- Time Complexity - O(n)

```js
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}

same([1, 2, 3, 2], [9, 1, 4, 4]);
```

### ANAGRAMS

- Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.

```js
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

validAnagram("", ""); // true
validAnagram("aaz", "zza"); // false
validAnagram("anagram", "nagaram"); // true
validAnagram("rat", "car"); // false
validAnagram("awesome", "awesom"); // false
validAnagram("qwerty", "qeywrt"); // true
validAnagram("texttwisttime", "timetwisttext"); // true
```

## MULTIPLE POINTERS

Creating pointers or values that correspond to an index or position and move towards the begining, end or middle based on a certain condition

Very efficient for solving problems with minimal space complexity as well

### AN EXAMPLE

Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist

```js
sumZero([-3, -2, -1, 0, 1, 2, 3]); // [-3, 3]
sumZero([-2, 0, 1, 3]); // undefined
sumZero([1, 2, 3]); // undefined
```

#### A NAIVE SOLUTION

Time Complexity - O(N^2)  
Space Complexity - O(1)

```js
function sumZero(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i+1;, j < arr.length; j ++) {
            if(arr[i] + arr[j] === 0) {
                return [arr[i], arr[j]];
            }
        }
    }
}
```

#### REFACTORED

Time Complexity - O(N)
Space Complexity - O(1)

```js
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}
```

### countUniqueValues

Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted

```js
// Maph's Solution
function countUniqueValues(array) {
  let result = 0;
  const noMeaningResult = array.reduce((prev, current) => {
    if (prev !== current) {
      result += 1;
    }
    return current;
  }, 0);
  return result;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4
```

```js
// Colt's Solution

function countUniqueValuesByColt(arr) {
  if (arr.length === 0) return 0;
  var i = 0;
  for (var j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

console.log(countUniqueValuesByColt([1, 1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValuesByColt([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValuesByColt([])); // 0
console.log(countUniqueValuesByColt([-2, -1, -1, 0, 1])); // 4
```

## SLIDING WINDOW

This pattern involves creating a window which can either be an array or number from one position to another

Depending on a certain condition, the window either increases or closes (and a new window is created)

Very useful for keeping track of a subset of data in an array/string etc.

### AN EXAMPLE

Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

#### A NAIVE SOLUTION

Time Complexity - O(N^2)

```js
function maxSubarraySum(arr, num) {
  if (num > arr.length) {
    return null;
  }
  var max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp < max) {
      max = temp;
    }
  }
  return max;
}
```

#### REFACTORED

Time Complexity - O(N)

```js
function maxSubarraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3); // 19
```

## DIVIDE AND CONQUER

This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data

This pattern can tremendously decrease **time complexity**

### AN EXAMPLE

Given a **sorted** array of integers, write a function called search, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1

```js
search([1, 2, 3, 4, 5, 6], 4); // 3
search([1, 2, 3, 4, 5, 6], 6); // 5
search([1, 2, 3, 4, 5, 6], 11); // -1
```

#### A NAIVE SOLUTION

Linear Search

Time Complexity O(N)

```js
function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      return i;
    }
  }
  return -1;
}
```

#### REFACTOR

Time Complexity - Log(N) - Binary Search

```js
function search(array, val) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];

    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}

const result1 = search([1, 2, 3, 4, 5, 6], 4); // 3
const result2 = search([1, 2, 3, 4, 5, 6], 6); // 5
const result3 = search([1, 2, 3, 4, 5, 6], 11); // -1
console.log(result1, result2, result3);
```

## Practice

### Frequency Counter - sameFrequency

Write a function called **sameFrequency**. Given two positive integers, find out if the two numbers have the same frequency of digits.

Your solution MUST have the following complexities

Time complexity: O(N)

- Sample input

```js
sameFrequency(182, 281); // true
sameFrequency(32, 14); // false
sameFrequency(3589578, 5879385); // true
sameFrequency(22, 222); // false
```

```js
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
```

```js
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
```

### Frequency Counter / Mutiple Pointers - areThereDuplicates

Implement a function called, **areThereDuplicates** which accepts a **variable number of arguments**, and checks whether there are any duplicates among the arguments passed in.
You can solve this using the frequency counter pattern OR the multiple pointers pattern.

Restrictions:  
 Time - O(n)  
 Space - O(n)

Bonus:  
 Time - O(n log n)  
 Space - O(1)

```js
// Examples:
console.log(areThereDuplicatesFC(1, 2, 3)); // false
console.log(areThereDuplicatesFC(1, 2, 2)); // true
console.log(areThereDuplicatesFC("a", "b", "c", "a")); // true
```

```js
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
```

```js
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
```

### Multiple Pointers - averagePair

Write a function called averagePair. Griven a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

Bonus Constraints:  
Time: O(N)  
Space: O(1)

```js
function averagePair(array, target) {
  // ...
  return true;
}

const result1 = averagePair([1, 2, 3], 2.5); // true
const result2 = averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8); // true
const result3 = averagePair([-1, 0, 3, 4, 5, 6], 4.1); // false
const result4 = averagePair([], 4); // false
console.log(result1, result2, result3, result4);
```

### Multiple Pointers - isSubsequence

Write a function called **isSubsequence** which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, **without their order changing.**

AT LEAST  
Time Complexity - O(N + M)  
Space Complexity - O(1)

```js
// Examples:
const isSub1 = isSubsequence("hello", "hello world"); // true
const isSub2 = isSubsequence("sing", "sting"); // true
const isSub3 = isSubsequence("abc", "abracadabra"); // true
const isSub4 = isSubsequence("abc", "acb"); // false (order matters)
```

```js
function isSubsequence(a, b) {
  //...
  return true;
}
```
