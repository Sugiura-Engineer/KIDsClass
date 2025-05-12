//データの編集画面(メインになる部分).

import "../css/Edit.css";
//@ts-ignore
import {csvDisplay} from "../js/csvDisplay"

import {useState,useEffect} from "react";                       //状態を管理するというやつだが、つまりは監視対象を追加設定するようなもの.
import {useLocation,Link} from "react-router-dom";


function Edit(){
  const location = useLocation();
  const [forEditData, setForEditData] = useState([]);

  //ロードしてからstate更新でnull回避.
  useEffect(()=>{
    if(location.state.cleanedData.length > 0){
      setForEditData(location.state.cleanedData);
      csvDisplay(location.state.cleanedData,".mainDisplay");
    };
  },[forEditData]);


  return(
    <>
      <header className="editHeader">
        <Link to={"/KIDsClass"}><img  className="headImg" src="/KIDsClass//KIDsClass_logo.png"></img></Link>
      </header>
      

      <div className="editWrapper">
        <div className="leftContainer">
          <div className="mainDisplay">

          </div>
        </div>

        <div className="rightContainer">
          
        </div>

      </div>
    </>
  )
}



export default Edit