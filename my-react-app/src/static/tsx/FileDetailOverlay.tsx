import {Overlay} from "react-overlays";
import {useEffect,useRef} from "react";
import {useNavigate} from "react-router-dom";
//@ts-ignore
import {cleansingCSV} from "../js/cleansingCSV"
//@ts-ignore
import {csvDisplay} from "../js/csvDisplay"


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
          <div onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor:"white",
              width:"70vw",height:"80vh",
              margin:"auto",marginTop:"10vh",
              display:"flex",flexDirection: "column",textAlign:"center"}}>
              <div className="detailDisp" style={{width:"95%",height:"75%",margin:"auto",border:"2px #389500 solid",overflowX:"scroll",overflowY:"scroll"}}></div>
              <div style={{width:"100%",height:"10%",justifyContent:"center",display:"flex",gap:"10%",marginBottom:"1.5%"}}>
                <div style={{width:"30%",border:"2px #389500 solid",backgroundColor:"white",color:"#389500",borderRadius:"50px",display:"flex",justifyContent:"center",alignItems:"center"}} onClick={onClose}><p>キャンセル</p></div>
                <div onClick={handleTransision} style={{width:"30%",border:"2px #389500 solid",backgroundColor:"#389500",color:"white",borderRadius:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}>このデータを使う</div>
              </div> 
          </div>
        </div>  
      }
    </Overlay>
  );
};