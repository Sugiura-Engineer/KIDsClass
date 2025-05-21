//コンポーネントをとる.
import EditLeftDiv from "./editcomponent/EditLeftDiv.js";
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
  const [forEditData, setForEditData] = useState(location.state.cleanedData);
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
      <p style={{margin:"0",backgroundColor:"#389500",color:"white",display:"flex",alignItems:"center",justifyContent:"center",height:"3.5vh",fontSize:"90%"}}>{rawFile?.name}</p>
      
      <div className="edit-content-container">
        <EditLeftDiv/>
        <EditCenterDiv rawFile={rawFile} forEditData={forEditData}/>

      </div>

      
    </>
  )
}



export default Edit