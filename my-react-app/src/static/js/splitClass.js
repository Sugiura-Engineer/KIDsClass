//ボタンを押したら、クラス数と、割り当てカラムを取得して.

// classSplit.js

export function splitClass(data, classCount, genderKey, pianoKey) {
  const classLists = data;
  console.log("js内",classLists);
  console.log(classCount,genderKey,pianoKey)

  // 1. ピアノできる人（"可"）を抽出して均等に配分
  const pianoAble = classLists.filter((student) => student[pianoKey] === "可");
  pianoAble.forEach((student, index) => {
    classLists[index % classCount].push(student);
  });
  console.log("ピアノ",pianoAble);
  console.log("ピアノ後",classLists);

  // 2. 残りの生徒（ピアノできない人）
  const remaining = data.filter((student) => student[pianoKey] !== "可");

  // 3. 性別で分ける
  const boys = remaining.filter((s) => s[genderKey] === "男");
  const girls = remaining.filter((s) => s[genderKey] === "女");

  // 4. ランダムに並び替え（居住地域が偏らないように）
  const shuffleByRegion = (students) => {
    const regionMap = {};
    students.forEach((s) => {
      const region = s[regionKey];
      if (!regionMap[region]) regionMap[region] = [];
      regionMap[region].push(s);
    });

    const regionKeys = Object.keys(regionMap);
    const result = [];
    let index = 0;
    while (result.length < students.length) {
      const region = regionKeys[index % regionKeys.length];
      if (regionMap[region].length > 0) {
        result.push(regionMap[region].shift());
      }
      index++;
    }
    return result;
  };

  const shuffledBoys = shuffleByRegion(boys);
  const shuffledGirls = shuffleByRegion(girls);

  // 5. クラスに交互に追加
  shuffledBoys.forEach((student, i) => {
    classLists[i % classCount].push(student);
  });
  shuffledGirls.forEach((student, i) => {
    classLists[i % classCount].push(student);
  });

  return classLists;
}