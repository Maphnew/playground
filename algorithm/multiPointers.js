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

// console.log(countUniqueValues([1, 1, 1, 1, 1, 1, 2])); // 2
// console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
// console.log(countUniqueValues([])); // 0
// console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4

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

// console.log(countUniqueValuesByColt([1, 1, 1, 1, 1, 1, 2])); // 2
// console.log(countUniqueValuesByColt([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
// console.log(countUniqueValuesByColt([])); // 0
// console.log(countUniqueValuesByColt([-2, -1, -1, 0, 1])); // 4

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

// maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3); // 19

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

const search1 = search([1, 2, 3, 4, 5, 6], 4); // 3
const search2 = search([1, 2, 3, 4, 5, 6], 6); // 5
const search3 = search([1, 2, 3, 4, 5, 6], 11); // -1
// console.log(search1, search2, search3);

// - Average Pair

// Write a function called averagePair.
// Griven a sorted array of integers and a target average, determine if there is a pair of values in the array where
// the average of the pair equals the target average. There may be more than one pair that matches the average target.

// Bonus Constraints:
// Time: O(N)
// Space: O(1)

function averagePair(arr, num) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let avg = (arr[start] + arr[end]) / 2;
    if (avg === num) return true;
    else if (avg < num) start++;
    else end--;
  }
  return false;
}

const averagePair1 = averagePair([1, 2, 3], 2.5); // true
const averagePair2 = averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8); // true
const averagePair3 = averagePair([-1, 0, 3, 4, 5, 6], 4.1); // false
const averagePair4 = averagePair([], 4); // false
console.log(averagePair1, averagePair2, averagePair3, averagePair4);

// - isSubsequence

// Write a function called  isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

// Examples:
const isSub1 = isSubsequence("hello", "hello world"); // true
const isSub2 = isSubsequence("sing", "sting"); // true
const isSub3 = isSubsequence("abc", "abracadabra"); // true
const isSub4 = isSubsequence("abc", "acb"); // false (order matters)
console.log("isSubsequence", isSub1, isSub2, isSub3, isSub4);

// AT LEAST
// Time Complexity - O(N + M)
// Space Complexity - O(1)

function isSubsequence(str1, str2) {
  var i = 0;
  for (var j = 0; j < str2.length; j++) {
    if (str1[i] === str2[j]) {
      i++;
    }
    if (str1.length === i) {
      return true;
    }
  }
  return false;
}

// Colt's Solution

function isSubsequence2(str1, str2) {
  var i = 0;
  var j = 0;
  if (!str1) return true;
  while (j < str2.length) {
    if (str2[j] === str1[i]) i++;
    if (i === str1.length) return true;
    j++;
  }
  return false;
}

// Colt's Solution2 - O(1) 공간이 아닌 재귀

function isSubsequence3(str1, str2) {
  if (str1.length === 0) return true;
  if (str2.length === 0) return false;
  if (str2[0] === str1[0]) return isSubsequence3(str1.slice(1), str2.slice(1));
  return isSubsequence3(str1, str2.slice(1));
}

const isSub31 = isSubsequence("hello", "hello world"); // true
const isSub32 = isSubsequence("sing", "sting"); // true
const isSub33 = isSubsequence("abc", "abracadabra"); // true
const isSub34 = isSubsequence("abc", "acb"); // false (order matters)

console.log("isSubsequence3", isSub31, isSub32, isSub33, isSub34);
