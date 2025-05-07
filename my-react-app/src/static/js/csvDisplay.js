//csvを取得して表示するjs.
//ファイルの選択検知を行い.
//選択ファイルの抽出を行い.
//cleansingCSVでクレンジングして.
//

import {cleansingCSV} from "../js/cleansingCSV.js";

////////
export function getFile(e,setSelectedFile,setTableData,tableData){     //eを引数として取得.edit.tsxでgetFile(e,setSelectedFile)したので名前は違うがそのまま.
  //ファイル取得.
  const file=e.target.files?.[0];               //eはJSの便利システムで、何かしらのイベントが起こった時に自動で作って渡してくれる情報の塊.log(e)してdevtool見るとわかるが、eの中にあるtargetの中にあるfilesを取得してfileに入れてるだけ.[0]はfilesの一つ目ってだけ.超簡単.
  setSelectedFile(file);                        //ReactのStateを更新.
  //読み込み完了.
  const reader = new FileReader();              //jsでファイルを読み込むときの組み込みオブジェクト(読み取り機).


  ////
  //本体.
  reader.onload = () =>{                        //readAsTextのあとに実行される。設定しておくみたいな感じ.ファイルの読み込みが行われたときに自動で実行される関数の登録.
    const f_text = reader.result;               //こいつはonloadの中でしか使えない!!!renderが読み取ったテキストデータをいれる.
    
    //クレンジング
    cleansingCSV(f_text);
    const dataRows = cleansingCSV(f_text);      //戻り値の取得.
    setTableData(dataRows);


    ///////
    //表示.
    const display = document.querySelector(".left-display");  //表示場所.
    display.innerHTML =  "";
    
    //table作成.                                          //表は<table>の中に、<tr>行を作り、その中が<th>というヘッダか、<td>というデータで分けて作る.theadはヘッダを包み、tbodyは中身を包む.
    const table = document.createElement("table");       
    //theadとtr作って、thを一つずつ作ってはtrに加える.
    const headerThead = document.createElement("thead");  //いらないけどCSSで管理しやすくなる.
    const headerRow = document.createElement("tr");
    Object.keys(dataRows[0]).forEach((key) =>{            //dataRowsの0からスタートしてkeyを全部ループ.
      const th = document.createElement("th");
      th.textContent = key;
      headerRow.appendChild(th);
    });
    headerThead.appendChild(headerRow);
    table.appendChild(headerThead);

    //tbody作って、行数分のtr作って、tbを入れる.
    const tbody = document.createElement("tbody");
    dataRows.forEach((row) =>{
      const tr = document.createElement("tr");
      Object.keys(row).forEach((key)=>{
        const td = document.createElement("td");
        td.textContent = row[key];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    })
    table.appendChild(tbody);
    display.appendChild(table);
  };

  reader.readAsText(file);//選ばれたファイルをテキストとして読み込む、これをやるとrender.onloadされる.
};