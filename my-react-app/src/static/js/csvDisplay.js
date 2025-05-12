//オブジェクトデータを取得して表示するjs.
//データを特定のHTMLタグにテーブルで表示する.


export function csvDisplay(cleanedData,hTag){     //eを引数として取得.edit.tsxでgetFile(e,setSelectedFile)したので名前は違うがそのまま.
    
  //下準備.
  const display = document.querySelector(hTag);  //表示場所.
  display.innerHTML =  "";
  
  //table作成.                                          //表は<table>の中に、<tr>行を作り、その中が<th>というヘッダか、<td>というデータで分けて作る.theadはヘッダを包み、tbodyは中身を包む.
  const table = document.createElement("table");       
  //theadとtr作って、thを一つずつ作ってはtrに加える.
  const headerThead = document.createElement("thead");  //いらないけどCSSで管理しやすくなる.
  const headerRow = document.createElement("tr");
  Object.keys(cleanedData[0]).forEach((key) =>{            //dataRowsの0からスタートしてkeyを全部ループ.
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });
  headerThead.appendChild(headerRow);
  table.appendChild(headerThead);

  //tbody作って、行数分のtr作って、tbを入れる.
  const tbody = document.createElement("tbody");
  cleanedData.forEach((row) =>{
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