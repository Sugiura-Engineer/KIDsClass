//ファイルのクレンジングを行うjs.
//fileを引数とし、fileをreaderで読んでテキスト化.
//テキストを改行で切って行を作る.
//できた行の1行目を列名に、残りを行番号付きのオブジェクトデータに.
//きれいなオブジェクト型行列データの出来上がり.
//→この後これを使用してDisplayで表示を行う.

//注意：onloadは非同期なので、同期っぽくさせる必要がある(完全な同期はJSではできない).
//この時に使うのがpromise+async/await.
//promiseで非同期処理の結果を保持し、async/awaitでそれを待ってから次に進む.
//promiseだけでも動作は変わらないが、コードがネストするので両方使うのがおすすめ.



export default async function cleansingCSV(file){ //関数を非同期関数にするよ.
  const reader = new FileReader();

  return await new Promise((resolve,reject) => {
    reader.onload = () => {
      //最初にファイルをテキストにする.
      const f_text = reader.result;

      //できたテキストを改行で区切って最後の空行も消す.
      const lines = f_text
        .split("\n")                                                   //関数を順番に使う.
        .filter(line => line.trim() !== "");                           //条件を満たす要素だけを残す、!==""は空じゃないやつを残すという意味.lineをtrimしたものが""でない場合.    
      
      //1行目のみ分離して列名に.
      const headers = lines[0].split(",");                             //中身がheaders=["a","b",...]となってるはず.
      //2行目以降をsliceで切り出して、.
      //オブジェクト型データを作り、行番号をつけ、列名をキーとして中身をリンク.
      const dataRows = lines.slice(1).map((line,index) => {            //slice[1]は２行目以降切り出し,mapは一つずつ処理して新しい配列を返す,lineは１要素で、indexは0から始まる数字(第二引数).
        const cells = line.split(",");                                 //cellsはリストになる.
        const eachRow = { 行番号: index + 1 };                         //初めから行番号を持ってる変数を宣言.

        headers.forEach((header,i) => {                               //各ヘッダと対応する値を詰めていく、iは0から始まる数字.
          eachRow[header.trim()] = cells[i]?.trim() ?? "";            //trimは前後の空白文字を取り除く.cells[i]があれば、trimを実行、無ければ空文字にする.
          //objectはキーと値の２つを入れなきゃいけない.この記法は、obj["名前"]="田中"のような書き方をする.
          //headerを順番に取り出し、cellsと同じ順番のやつをeachRowに代入.
        });//これで一行出来上がり.
        return eachRow;       //一行をここでdataRowsに追加.
      });
      resolve(dataRows);      //Promiseを成功として終了させ、返り値を戻すよ.
    };
    reader.oneerror = reject; //ファイル読み込みがうまくいかなかったときにpromiseでエラーが起きたことを通知する.
    reader.readAsText(file);  //promiseの中に入れてあげる.
  });
};