//トップページ.
import {useState,useRef} from "react";
import FileDropOverlay from "./FileDropOverlay";
import "../css/Home.css";

function Home() {


  const [showOverlay,setShowOverlay] = useState(false);
  const pRef = useRef(null);                        //refを要素につけてターゲットにする.


  return ( 
    <>
    <header className="home_header">
      <img src="./KIDsClass_logo.png"></img>
    </header>
    <div className="a_box">
      <div className="home_center">
          <img src="./KIDsClass_logo.png"></img>
          <div className="click_box">
            <p ref={pRef} onClick={() =>{
              setShowOverlay(!showOverlay);
            }}
            >Excel・csvデータでクラス分けする</p>
          </div>
      </div>
    </div>

    <FileDropOverlay target={pRef.current} show={showOverlay} />
    </>
  );
}
export default Home
///////////////////////