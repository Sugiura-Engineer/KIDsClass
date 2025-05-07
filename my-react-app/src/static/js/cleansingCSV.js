//ファイルのクレンジングを行うjs.
//1行目を列名として取得、2行目以降を行番号付きでオブジェクト化.
//最終的にfileをオブジェクト型の配列にする.

export function cleansingCSV(f_text){
  //引数のテキストを改行で区切る.
  const lines = f_text
    .split("\n")                                            //関数を順番に使う.
    .filter(line => line.trim() !== "");                    //条件を満たす要素だけを残す、!==""は空じゃないやつを残すという意味.lineをtrimしたものが""でない場合.
  //1行目のみ分離して列名に.
  const headers = lines[0].split(",");                      //中身がheaders=["a","b",...]となってるはず.

  //2行目以降をスライスして切り出し.
  const dataRows = lines.slice(1).map((line,index) => {     //slice[1]は２行目以降切り出し,mapは一つずつ処理して新しい配列を返す,lineは１要素で、indexは0から始まる数字(第二引数).
    const cells = line.split(",");                          //cellsはリストになる.
    const eachRow = { 行番号: index + 1 };                  //初めから行番号を持ってる変数を宣言.

    headers.forEach((header,i) => {                         //各ヘッダと対応する値を詰めていく、iは0から始まる数字.
      eachRow[header.trim()] = cells[i]?.trim() ?? "";      //trimは前後の空白文字を取り除く.cells[i]があれば、trimを実行、無ければ空文字にする.
      //objectはキーと値の２つを入れなきゃいけない.この記法は、obj["名前"]="田中"のような書き方をする.
      //headerを順番に取り出し、cellsと同じ順番のやつをeachRowに代入.
    });//これで一行出来上がり.

    return eachRow;//一行をここでdataRowsに追加.
  })

  //cleansingCSV呼び出した関数に返してあげる.
  return dataRows;
};