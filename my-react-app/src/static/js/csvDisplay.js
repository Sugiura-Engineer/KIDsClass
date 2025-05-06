//csvを取得して表示するjs.
//ファイルの選択検知を行い.
//選択ファイルの抽出を行い.
//csvの一行目を取得してカラム名にして.
//

////////
export function getFile(e,setFile){                     //eを引数として取得.

  const file=e.target.files?.[0];               //eはJSの便利システムで、何かしらのイベントが起こった時に自動で作って渡してくれる情報の塊.log(e)してdevtool見るとわかるが、eの中にあるtargetの中にあるfilesを取得してfileに入れてるだけ.[0]はfilesの一つ目ってだけ.超簡単.
  setFile(file);                                //ReactのStateを更新.

  const reader = new FileReader();              //jsでファイルを読み込むときの組み込みオブジェクト.

  reader.onload = () =>{                        //ファイルの読み込みが行われたときに自動で実行される関数の登録.
    const text = reader.result;                 //renderが読み取ったテキストデータをいれる.
    const display = document.querySelector(".left-display");
    display.innerHTML =  "";

    const lines = text.split("\n");             //改行で区切る.
    for(const line of lines){
      const p = document.createElement("p");
      p.textContent = line;
      display.appendChild(p);
    }
  };

  reader.readAsText(file);//選ばれたファイルをテキストとして読み込む、これをやるとrender.onloadされる.
};