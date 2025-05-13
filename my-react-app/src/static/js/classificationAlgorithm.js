//分離生成アルゴリズム
//クラス数とクレンジングデータを引数として持つ.
//データからピアノ・家庭対応などの各クラスに分ける必要のある生徒を抽出し.
//その後、性別、地域、成績、運動などを均等にする.

export function classificationAlgorithm(classNumber,tableData){
//クラスの数だけクラスリストを作成.
  const classList = createClass(classNumber);
  const stuPerClass = Math.ceil(tableData.length/classNumber);
  console.log(stuPerClass);

//ピアノを弾ける人を抽出して分ける.
  let t_piano = tableData.filter(row => row["ピアノ"] === "可");
//家庭対応を分ける.
  let t_fam = tableData.filter(row => row["家庭対応"] === "有")
//性別を分ける.
  let rest_boy = tableData
    .filter(row => row["性別"] === "男")
    .filter(row => 
      !t_piano.some(p => p["行番号"] === row["行番号"]) && //t_piano.someは、t_pianoの中に条件を満たすものがあればtrue.
      !t_fam.some(f => f["行番号"] === row["行番号"])      //なので、両方falseの奴のみを取得するという意味.
    );
  let rest_girl = tableData
    .filter(row => row["性別"] === "女")
    .filter(row => 
      !t_piano.some(p => p["行番号"] === row["行番号"]) && //t_piano.someは、t_pianoの中に条件を満たすものがあればtrue.
      !t_fam.some(f => f["行番号"] === row["行番号"])      //なので、両方falseの奴のみを取得するという意味.
    );

//いったん実行
  //クラス作って、必要なのを振り分けて、平均になるように分ける
  t_piano.forEach((student,index) =>{
    const targetClassIndex = index % classNumber;         //余りを求める.classNumberは変わらないので、数字が循環する.
    classList[targetClassIndex].members.push(student);
  })
  //家庭対応を分ける.
  t_fam.forEach((student,index) => {
    const targetClassIndex= index % classNumber;
    classList[targetClassIndex].members.push(student);
  })
  //性別を均等にする.
  rest_boy.forEach((student,index) =>{
    const targetClassIndex = index % classNumber;
    classList[targetClassIndex].members.push(student);
  });
  rest_girl.forEach((student,index) =>{
    const targetClassIndex = index % classNumber;
    classList[targetClassIndex].members.push(student);
  });

  //各地域を分ける.
  //各成績が均等になるように分ける.
  //体力で分ける
  console.log(classList);
  return classList;
};

function createClass(n){
 const result = [];
 for(let i=1; i<=n; i++){
  result.push({name:`クラス${i}`,members:[]});
 }
 return result;
};