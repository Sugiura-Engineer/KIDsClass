import "../../css/css-edit/EditCenterDiv.css"
//@ts-ignore
import {csvDisplay} from "../../js/csvDisplay.js"
import { useEffect } from "react";

type DataRow = {
  行番号: number;
  [key: string]: string | number;
};
type Props = {
  rawFile:File|null;
  forEditData:DataRow[];
}


export default function EditCenterDiv({rawFile,forEditData}:Props){
  //ファイルの表示と

  useEffect(()=>{
    csvDisplay(forEditData,".center-Display");
  },forEditData)

  return(
    <div className="center-Container">
      <div className="center-Header">
        全体データ
      </div>
      <div className="center-Display"></div>
    </div>
  )
}