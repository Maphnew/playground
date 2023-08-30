function solution(maps) {
  var answer = [];
  let share = 0;
  let max = 0;
  let lookup = {};
  // let lookup = {
  //     A: ['B', 'C', 'Z'],
  //     B: ['A', 'Z'],
  //     C: ['A'],
  //     Z: ['A', 'B']
  // }
  maps.forEach((row, i) => {
    const arr = row.split("");
    arr.forEach((c, idx) => {
      if (c !== ".") {
        if (typeof lookup[c] !== "object") {
          lookup[c] = [];
        }
      }
    });
  });
  console.log("set lookup", lookup);

  maps.forEach((row, i) => {
    if (maps.length - 1 === i) {
      return;
    }
    const arr = row.split("");
    arr.forEach((c, idx) => {
      if (c !== ".") {
        if (arr[idx + 1] !== "." && arr[idx + 1] !== c && idx !== arr.length - 1) {
          lookup[c].push(arr[idx + 1]);
        }
        if (maps[i + 1][idx] !== "." && maps[i + 1][idx] !== c) {
          lookup[c].push(maps[i + 1][idx]);
        }
      }
    });
  });

  console.log(lookup);

  for (const country in lookup) {
    if (lookup[country].length === 0) {
      delete lookup[country];
    } else {
      lookup[country] = new Set(lookup[country]);
    }
  }
  console.log(lookup);
  return answer;
}

solution([
  "..........",
  "AAACC.....",
  "AC...AZ...",
  "B....ZZ...",
  "..C..Z....",
  ".....BBB..",
  ".....BZ...",
  "..........",
  ".QQ.......",
  "..........",
]);

// let lookup = {
//     A: ['B', 'C', 'Z'],
//     B: ['A', 'Z'],
//     C: ['A'],
//     Z: ['A', 'B']
// }
