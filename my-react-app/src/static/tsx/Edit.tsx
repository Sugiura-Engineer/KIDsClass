//コンポーネントをとる.
import EditCenterDiv from "./editcomponent/EditCenterDiv.js";


//データの編集画面(メインになる部分).

import "../css/Edit.css";
//@ts-ignore
import {classificationAlgorithm} from "../js/classificationAlgorithm.js"
//@ts-ignore
import {csvDisplay} from "../js/csvDisplay"

import {useState,useEffect} from "react";                       //状態を管理するというやつだが、つまりは監視対象を追加設定するようなもの.
import {useLocation,Link} from "react-router-dom";


function Edit(){
  const location = useLocation();
  const [forEditData, setForEditData] = useState([]);
  const [rawFile,setRawFile] = useState(location.state.rawFile);

  //@ts-ignore
  let classResult = null;
  let displayClassNumber = 0;

  //ロードしてからstate更新でnull回避.
  useEffect(()=>{
    if(location.state.cleanedData.length > 0){
      setForEditData(location.state.cleanedData);
    };
  },[forEditData]);

  return(
    <>
      <header className="editHeader">
        <Link to={"/KIDsClass"}><img  className="headImg" src="/KIDsClass//KIDsClass_logo.png"></img></Link>
      </header>
      
      <EditCenterDiv rawFile={rawFile}/>

        <div className="rightContainer">
          <div className="classNumberBox">
            クラス数：
            <input type="number" id="splitClassNumber"></input>
          </div>
          <button>クラス分けをする</button>
        </div>
    </>
  )
}



export default Edit