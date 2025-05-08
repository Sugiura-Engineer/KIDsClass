import {Overlay} from "react-overlays";
import React, { useCallback } from "react";

//Propsは親コンポから子コンポに渡す引数.
//Propsにtargetとshowを入れてる.このコンポーネントは2つの引数を受け取りますよ.
//中身を厳格にするために書く.
type Props = {
  target:HTMLElement | null;                                   //中身をHTMLElement限定に.
  show: boolean;                                               //boolean(tru/fal).
};


//親から渡されたtarget要素の上に、show===trueの時だけ表示する.
export default function FileDropOverlay({target,show}:Props){  //const target= props.targetの簡略構文.引数propsはProps型.
  
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      console.log("ファイルがドロップされました:", file);
      // TODO: ファイル処理を追加
    }
  }, []);
  
  const handleOpenFolder = () => {
    // ブラウザからローカルフォルダを直接開くことはできないが、
    // input[type=file] の click() を使って「ファイル選択」を促せる
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xls,.xlsx";
    input.click();
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        console.log("ボタンで選ばれたファイル:", file);
        // TODO: ファイル処理を追加
      }
    };
  };

  
  return(                                                      //オーバーレイ表示用のコンポーネント.オーバーレイの表示位置要素,trueの知己だけ表示されて、表示位置は対象の上部.
    <Overlay target={target} show={show} placement="top">
      {({props}) => (                                          //Overlayのchildrenに関数を渡して、戻り値で描画する.
        <div
        {...props}
        style={{
          position: "absolute",
          backgroundColor: "#222",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          zIndex: 9999,
          ...props.style,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        >
        <div
          style={{
            backgroundColor: "#fff",
            color: "#000",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            minWidth: "300px",
          }}
        ></div>
        <p style={{ marginBottom: "20px" }}>
          ファイルをここにドロップしてください
        </p>
        <button onClick={handleOpenFolder}>
          ローカルから選ぶ
        </button>
      </div>
      )}
    </Overlay>
  );
};