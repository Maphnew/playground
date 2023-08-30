function solution(p) {
  let answer = 0;
  let lookup = {};
  // 1. 쉽게 비교할 수 있도록 sorting한다.
  const sortedP = p.map((likes) => {
    return likes.sort();
  });
  // 2. 전체 관계에 대한 object 형식의 정보를 생성한다.
  sortedP.forEach((likes) => {
    const a = likes[0];
    const b = likes[1];

    if (lookup[a]) {
      lookup[a][b] = lookup[a][b] ? lookup[a][b] + 1 : 1;
    } else {
      lookup[a] = { [b]: 1 };
    }
  });
  // 3. 선호하는 수가 1보다 크면 서로 선호한다고 판단하고 답의 갯수를 늘린다.
  for (const likes in lookup) {
    for (const l in lookup[likes]) {
      if (lookup[likes][l] > 1) {
        answer += 1;
      }
    }
  }
  return answer;
}
