import {Overlay} from "react-overlays";
import {useState,useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom";
//@ts-ignore
import {cleansingCSV} from "../js/cleansingCSV"
//@ts-ignore
import {csvDisplay} from "../js/csvDisplay"
import "../css/FileDetailOverlay.css"



type DataRow = {
  行番号:number;
  [key:string]:string | number;
};

type Props = {                                  //中身をHTMLElement限定に.
  show: boolean;                                               //boolean(tru/fal).
  onClose: () => void;
  rawFile:File|null;
  setCleansingData: (cleanedData:DataRow[]) => void;
  cleanedData:DataRow[]|null;
};

//ファイルが得られたらファイルの詳細を表示する.
export default function FileDetailOverlay({show,onClose,rawFile,setCleansingData,cleanedData}:Props){
  
  const [showDetailOverlay,setShowDetailOverlay] = useState(false);
  useEffect(() => {
    if(show){
      requestAnimationFrame(() => {
        setShowDetailOverlay(true);
      })
      }else{
        setShowDetailOverlay(false);
      }
    },[show])


  //Fileを取得、データのクレンジングを行うのを待ってから、表示する関数.
  const handleDetailDisplay = async(
    rawFile:File|null,
    setCleansingData:(data:DataRow[])=>void
    ) => {
    if(!rawFile) return;

    const cleanedData = await cleansingCSV(rawFile);
    setCleansingData(cleanedData);
    cleanedDataRef.current = cleanedData;
    console.log("handleの中",cleanedData);

    if(cleanedData){
      csvDisplay(cleanedData,".detailDisp");  
    };
  };

  //detailの表示用.
  useEffect(()=>{
    if(show&&rawFile){
      handleDetailDisplay(rawFile,setCleansingData);
    }
  },[show,rawFile]);
  //Edit遷移用(Refは最新の値を一時的に覚えておくことができる).
  const cleanedDataRef = useRef<DataRow[] | null>(null);
  useEffect(()=>{
    cleanedDataRef.current = cleanedData;
  },[cleanedData]);
  const navigate = useNavigate();
  const handleTransision = () =>{
    if(!cleanedDataRef.current){
      alert("クレンジングデータ無し");
      return;
    }
    navigate("/KIDsClass/Edit/",{
      state:{cleanedData:cleanedDataRef.current}
    });
  };



  return(
    <Overlay target={()=>document.body} show={show} placement="top">
      {({props}) => 
        <div onClick={onClose}
          {...props}
          style={{
            backgroundColor:"rgba(0,0,0,0.5)",
            width:"100%",height:"100%",
            position:"fixed",top:0,left:0,
            zIndex:"999",
        }}
        >
          <div className={`detail-Overlay ${showDetailOverlay ? "detail-Showing": ""}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor:"white",marginRight:"auto",marginLeft:"auto",
              display:"flex",flexDirection: "column",textAlign:"center"}}>
              <div style={{color:"#389500",height:"5vh",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"1vh",}}>
                <span style={{fontSize:"110%",fontWeight:"500"}}>このデータを使用しますか？：</span>
                <span style={{fontSize:"120%",fontWeight:"500",textDecoration:"underline"}}>{rawFile?.name}</span>
              </div>
              <div className="detailDisp" style={{width:"95%",height:"75%",margin:"auto",border:"2px #389500 solid",overflowX:"scroll",overflowY:"scroll"}}></div>
              <div style={{width:"100%",height:"10%",justifyContent:"center",display:"flex",marginBottom:"1.5%"}}>
                <div style={{width:"50%",position:"relative"}}>
                  <div className="detailCancel" onClick={onClose} style={{border:"2px #389500 solid",backgroundColor:"white",color:"#389500",borderRadius:"50px",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",position:"absolute",right:"10%",}}>
                    <span className="cancelArrow">←</span>
                    <span className="cancelText">キャンセル</span>
                  </div>
                </div>
                <div style={{width:"50%",position:"relative"}}>
                  <div className="detailNext" onClick={handleTransision} style={{border:"2px #389500 solid",backgroundColor:"#389500",color:"white",borderRadius:"50px",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",position:"absolute",left:"10%", }}>
                    <span className="nextText">このデータを使う</span>
                    <span className="nextArrow">→</span>
                  </div>
                </div>
              </div> 
          </div>
        </div>  
      }
    </Overlay>
  );
};