//分析前の小さなセットアップのオーバーレイ.
//分けるクラス数と、対応カラムの選択をさせてからEditに飛ばす.
//cleanedDataを受けて.
//中でsplitClassNumberと配列設定を設定.
//Data,splitClassNumber,配列設定をEditに渡す.


import { Overlay } from "react-overlays";
import {useLocation} from "react-router-dom"

type Props = {
  show:boolean;
  onClose:() => void;
  cleanedData:[]|null;
};

export default function FileSetupOverlay({show,onClose,cleanedData}:Props){
  return(
    <Overlay target={()=>document.body} show={show} placement="top">
      {({props}) => 
        <div onClick={onClose}
          {...props}
          style={{
            backgroundColor:"rgba(0,0,0,0.5)",
            width:"100%",height:"100%",
            position:"fixed",top:0,left:0,
            zIndex:"999",}}   
        >
          <div onClick={(e) => e.stopPropagation()}>

          </div>
        </div>
      }
    </Overlay>
  );
};