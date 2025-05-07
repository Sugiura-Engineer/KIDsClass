//分離生成アルゴリズム
//クラス数とクレンジングデータを引数として持つ.
//データからピアノ・家庭対応などの各クラスに分ける必要のある生徒を抽出し.
//その後、性別、地域、成績、運動などを均等にする.

export function classificationAlgorithm(classNumber,tableData){
//クラスの数だけクラスリストを作成.
  const classList = createClass(classNumber);
  console.log(classList);

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
  

  //各地域を分ける.
  //各成績が均等になるように分ける.
  //体力で分ける
};

function createClass(n){
 const result = [];
 for(let i=1; i<=n; i++){
  result.push({name:`クラス${i}`,members:[]});
 }
 return result;
};