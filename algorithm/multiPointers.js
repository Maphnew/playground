// * Multiple Pointers

// 다중 포인터 패턴

function countUniqueValues(array) {
  let result = 0;
  const noMeaningResult = array.reduce((prev, current) => {
    // console.log("-----prev, current:", prev, current);
    if (prev !== current) {
      result += 1;
      // console.log("result:", result);
    }
    return current;
  }, 0);
  return result;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 1, 2])); // 2
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4

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

// Divide and Conquer
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

// - Average Pair

// Write a function called averagePair.
// Griven a sorted array of integers and a target average, determine if there is a pair of values in the array where
// the average of the pair equals the target average. There may be more than one pair that matches the average target.

// Bonus Constraints:
// Time: O(N)
// Space: O(1)

function averagePair(array, target) {
  return true;
}

const result1 = averagePair([1, 2, 3], 2.5); // true
const result2 = averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8); // true
const result3 = averagePair([-1, 0, 3, 4, 5, 6], 4.1); // false
const result4 = averagePair([], 4); // false
console.log(result1, result2, result3, result4);

// - isSubsequence

// Write a function called  isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

// Examples:
const isSub1 = isSubsequence("hello", "hello world"); // true
const isSub2 = isSubsequence("sing", "sting"); // true
const isSub3 = isSubsequence("abc", "abracadabra"); // true
const isSub4 = isSubsequence("abc", "acb"); // false (order matters)

// AT LEAST
// Time Complexity - O(N + M)
// Space Complexity - O(1)

function isSubsequence(a, b) {
  return true;
}
