//boolがtrueになった時に表示される.
//Fileを２通りの方法で受け付けて、受けたFileをStateに入れるだけ.
//外側を押したらboolをfalseにしてOverlayを消すこともできる.


//基本機能用.
import {Overlay} from "react-overlays";
import React, {useEffect, useState, useCallback } from "react";
import { FadeLoader } from "react-spinners";
import "../css/FileDropOverlay.css"


//型定義(いらないけど推奨).
type Props = {                                                 //Propsは親コンポネから子コンポネに渡す引数.
  show: boolean;                                               //boolean(tru/fal).
  onClose: () => void;                                         //Propsにtargetとshowを入れてる.このコンポーネントは2つの引数を受け取りますよ.
  onFileLoaded: (file:File) => void;                                    //中身を厳格にするために書く.
};


//本体.
export default function FileDropOverlay({show, onClose, onFileLoaded}:Props){        //親から渡されたProps(bool値とref用HTMLタグ)を持つ.const target= props.targetの簡略構文.引数propsはProps型.
  
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    if (show) {
      requestAnimationFrame(() => {
        setShouldAnimate(true); // アニメーションフラグをtrueに
      });
    } else {
      setShouldAnimate(false); // falseになったら即非表示に戻す
    }
  }, [show]); // ← 第二引数：この値が変わったときだけ実行

  const [showRoading, setShowRoading] = useState(false);

  //ファイルをドロップできるようにする関数.
  const handleDrop = useCallback((e:React.DragEvent)=>{                // e(イベントのオブジェクト)を、Reactのドラッグイベント型に限定.useCallbackは、関数をメモ化して毎回新しく作られないようにするReactのフック(use○○系のやつ).
    e.preventDefault();                                                // ブラウザにファイルを落とすと開いちゃうのを防ぐ.eの中のdataTranserの中のfilesの中にファイルがある.
    const file = e.dataTransfer.files?.[0];                            // ドロップされたファイルのうち最初の1つを取得.
    if(file){                                                          // ?は、オプショナルチェーン.?の前までが大丈夫(noneやundifined)じゃなければそのあとを実行する.
      console.log("file droped",file);
      setShowRoading(true);
      //ロードしたらrawFileのState更新,Dropを閉じてDetailを開く.
      setTimeout(()=>{
        onFileLoaded(file);
      },1500);
      setTimeout(()=>{
        setShowRoading(false);
      },1500);
    }                                                                  // []は、この関数は一回だけ生成されて、それ以降は同じものを使いまわす、という意味.
  },[]);                                                               // 関数は再レンダリングされるたびに作られる、そのためhandledropでuseEffectを使ってたりしたら、handleDropが変わったとされてしまってuseEffectが発火する.場合によって無くてもいい.
  //ファイルを選択できるようにする関数.
  const handleOpenFolder = () =>{
    const input = document.createElement("input");                     // input要素をJSで生成.
    input.type = "file";
    input.accept = ".csv, .xls, .xlsx";
    input.click();                                                     // ここでエクスプローラーを開く.(正確には見た目だけエクスプローラーのブラウザ提供のファイル選択ダイアログを開く).
    
    input.onchange = () =>{
      const file = input.files?.[0];
      if(file){
        console.log("file selected",file);
        setShowRoading(true);
        //ロードしたらrawFileのState更新,Dropを閉じてDetailを開く.
        setTimeout(()=>{
          onFileLoaded(file);
        },1500);
        setTimeout(()=>{
          setShowRoading(false);
      },1500);
      }
    };
  };


  return(
    <Overlay target={() => document.body} show={show} placement="top">
      {({props}) => ( //中身を子要素として渡す.
        <div  className={`custom-overlay ${shouldAnimate  ? "showing" : ""}`}
          onClick={onClose}
          {...props}
          style={{
            backgroundColor:"rgba(0,0,0,0.5)",
            width:"100%",height:"100%",
            position:"fixed",top:0,left:0,
            zIndex:"999",
        }}
          onDragOver = {(e) => e.preventDefault()}       // 用意されたイベント.自分で関数を設定してなにが起こるか定義してあげる.ドラッグしている間に発火するイベント.ここでe.preventDefault()しないとonDropが発火しない.
          onDrop = {handleDrop}                          // こっちも用意されたイベント.ファイルがドロップされたら呼ばれる.
        >
          <div onClick={(e) => e.stopPropagation()}      // 内側のdivをクリックしたときに親のonClickが発火しないようにする(伝播をふせぐ).
            style={{
              backgroundColor:"white",
              width:"50vw",height:"60vh",
              margin:"auto",marginTop:"20vh",
              textAlign:"center",
              position:"relative",
            }}>
              <div
                style = {{
                  border:"3px #389500 dashed",
                  width:"90%",height:"85%",
                  position:"absolute",
                  top:"50%",left:"50%",
                  transform:"translate(-50%,-50%)",
                  borderRadius:"20px",
                }}> 
                <p style={{color:"#389500",marginTop:"17%"}}>ここに .csv .xls .xlsxファイルをドロップ</p>
                <p style={{color:"#389500"}}>もしくは</p>
                <p onClick={handleOpenFolder} className="fileSelectP">ファイルを選択</p>
                <div className={`roadingSpinerContainer ${showRoading ? "roadingShowing":""}`} style={{width:"70%",height:"70%",backgroundColor:"white",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
                  <div style={{width:"100%",height:"100%",position:"relative"}}>
                    <FadeLoader color="#389500" speedMultiplier={0.8} cssOverride={{position: "absolute",top:"61%",left:"56%",transform:"translate(-56%, -61%)"}}/>
                  </div>
                </div>  
              </div>  
          </div>  
        </div>
      )}
    </Overlay>
  );
};