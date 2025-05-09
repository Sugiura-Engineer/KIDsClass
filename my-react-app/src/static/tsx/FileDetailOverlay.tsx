import {Overlay} from "react-overlays";

type Props = {                                  //中身をHTMLElement限定に.
  show: boolean;                                               //boolean(tru/fal).
  onTwoClose: () => void;
};

//ファイルが得られたらファイルの詳細を表示する.
export default function FileDetailOverlay({show,onTwoClose}:Props){
  return(
    <Overlay target={()=>document.body} show={show} placement="top">
      {({props}) => 
        <div 
          {...props}
          onClick={onTwoClose}
          style={{
            width:"80vw",height:"60vh",
            backgroundColor:"blue",
            margin:"auto",marginTop:"20vh",
            zIndex:"9999",position:"fixed",
          }}
        >
          
        </div>  
      }
    </Overlay>
  );
};