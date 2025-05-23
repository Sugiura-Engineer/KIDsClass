//コンポーネントをとる.
import EditLeftDiv from "./editcomponent/EditLeftDiv.js";
import EditCenterDiv from "./editcomponent/EditCenterDiv.js";
import EditRightDiv from "./editcomponent/EditRightDiv.js";

//データの編集画面(メインになる部分).

import "../css/Edit.css";
//@ts-ignore
import {classificationAlgorithm} from "../js/classificationAlgorithm.js"
//@ts-ignore
import {csvDisplay} from "../js/csvDisplay"

import {useState,useEffect} from "react";                       //状態を管理するというやつだが、つまりは監視対象を追加設定するようなもの.
import {useLocation,Link} from "react-router-dom";


function Edit(){
/////ファイル関係.
  const location = useLocation();
  const [forEditData, setForEditData] = useState(location.state.cleanedData);
  const [rawFile,setRawFile] = useState(location.state.rawFile);

  //ロードしたら編集データをセットする、null回避.
  useEffect(()=>{
    if(location.state.cleanedData.length > 0){
      setForEditData(location.state.cleanedData);
    };
  },[forEditData]);
/////編集関係.
  const [splitClassNumber,setSplitClassNumber] = useState(Number);
  const [executeClassification,setExecuteClassification] = useState(false);
  //クラス分けが実行されたら各種を実行.
  useEffect(()=>{
    if(executeClassification){
      
      setExecuteClassification(false);
    }
    else{
      return;
    }
  },[executeClassification])


  
  return(
    <>
      <header className="editHeader">
        <Link to={"/KIDsClass"}><img  className="headImg" src="/KIDsClass//KIDsClass_logo.png"></img></Link>
      </header>
      <p style={{margin:"0",backgroundColor:"#389500",color:"white",display:"flex",alignItems:"center",justifyContent:"center",height:"3.5vh",fontSize:"90%"}}>{rawFile?.name}</p>
      
      <div className="edit-content-container">
        <EditLeftDiv />
        <EditCenterDiv rawFile={rawFile} forEditData={forEditData}/>
        <EditRightDiv clickClassfication={() =>{setExecuteClassification(true)}}/>
      </div>
    </>
  )
}
export default Edit