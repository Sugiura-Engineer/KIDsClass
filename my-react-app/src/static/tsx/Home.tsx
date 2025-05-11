//トップページ.
import {useState} from "react";
import FileDropOverlay from "./FileDropOverlay";
import FileDetailOverlay from "./FileDetailOverlay";
import "../css/Home.css";


function Home() {


  const [rawFile,setRawFile] = useState(null);            //元のファイル.
  const [cleanedFile,setCleandFile] = useState(null);     //きれいにしたデータ.

  const [showOverlay,setShowOverlay] = useState(false);   //ファイルドロップのオンオフ.
  const [showFileDetail,setShowDetail] = useState(false); //ファイル詳細のオンオフ.
  

  return ( 
    <>
    <header className="home_header">
      <img src="./KIDsClass_logo.png"></img>
    </header>
    <div className="a_box">
      <div className="home_center">
        <p>クラス分けに速度と安心を</p>
        <img src="./KIDsClass_logo-white.png"></img>
        <div className="click_box"
          onClick={() =>{
            setShowOverlay(!showOverlay);
          }}>
          <p>.csv .xls .xlsx でクラス分けする</p>
          <img src="./green-arrow.png"></img>
        </div>
      </div>
    </div>


    <FileDropOverlay   show={showOverlay}    onClose={() => setShowOverlay(false)}     onFileLoaded={()=>setShowDetail(true)}/>  {/*画面全体に出るoverlayならrefは使われていないが、形式上書いておく必要がある*/}
    <FileDetailOverlay show={showFileDetail} onTwoClose={() => {setShowOverlay(false), setShowDetail(false)}}></FileDetailOverlay>
    </>
  );
}
export default Home


///////////////////////
//Home
//→FileDropOverlayでFile獲得、"元のFile用"Stateを更新.
//→FileDetailOverlayでFileを表示、元のFile用StateからFileを取得、それをオブジェクトデータに加工、"きれいにしたデータ用"Stateに保存.
//