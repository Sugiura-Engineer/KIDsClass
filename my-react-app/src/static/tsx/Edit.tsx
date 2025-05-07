//データの編集画面(メインになる部分).
import "../css/Edit.css";
// @ts-ignore
import {getFile} from "../js/csvDisplay.js";
// @ts-ignore
import {classificationExecution} from "../js/execution.js";
// @ts-ignore
import {classificationAlgorithm} from "../js/classificationAlgorithm.js"
import {useState} from "react";//状態を管理するというやつだが、つまりは監視対象を追加設定するようなもの.

function Edit(){
  const [selectedFile, setSelectedFile] = useState(null);//ファイル保存.
  const [tableData, setTableData] = useState([]);//クレンジング後のデータ.
  const [classNumber, setClassNumber] = useState(0);//クラス数保存.

  return(
    <>
      <div className="edit-container">
        <div className="left-wrapper">
          <div className="left-display">

          </div>
        </div>
        <div className="right-wrapper">
          <div className="right-editer">
            <form>
              <input type="file" accept=".csv,.xls,.xlsx" onChange={(e) => {getFile(e, setSelectedFile, setTableData,tableData);}}/>{/*ファイルが選択されたときに関数実行.eを受け取ってgetfileに渡す、という意味で、引数が２つあるときはこの書き方じゃないとダメ.自動だと一つだけなので.*/}
            </form>
            <form>
              <input type="number" min="0" value={classNumber} onChange={(e) => {setClassNumber(Number(e.target.value));}}></input>{/*状態を更新,引数として渡す.ここのNunberは数値に変換という意味,この状態だと文字列なので.*/ }
            </form>
            <button onClick={() => classificationExecution(selectedFile,classNumber,tableData)}>クラス分けを実行</button>{/*onClick={関数()}だと即時実行、onClick={()=>関数()}だとクリックしたときに実行.*/}

          </div>
        </div>
      </div>
    </>
  )
}



export default Edit