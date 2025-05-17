//トップページ.
import {useState} from "react";
import FileDropOverlay from "./FileDropOverlay";
import FileDetailOverlay from "./FileDetailOverlay";
import FileSetupOverlay from "./FileSetupOverlay";
import "../css/Home.css";


function Home() {


  const [rawFile,setRawFile] = useState<File|null>(null); //元のファイル. |はorで、File型かnullかという意味.
  const [cleanedData,setCleandData] = useState(null);     //きれいにしたデータ.

  const [showOverlay,setShowOverlay] = useState(false);   //ファイルドロップのオンオフ.
  const [showFileDetail,setShowDetail] = useState(false); //ファイル詳細のオンオフ.
  const [showFileSetup,setShowSetup] = useState(false);   //セットアップ用のオンオフ.


  const handleCSVDownload = () => {
    const link = document.createElement("a");        // <a> を作る.<a href="/sample.csv" download>.
    link.href = "/KIDsClass/児童情報データ100人.csv";  // ダウンロードさせたいファイルのURLを指定.
    link.download = "児童情報データ100人.csv";         // 保存時のファイル名を指定.
    link.click();                                    // 擬似的にクリックしてダウンロードを実行.
  }


  return ( 
    <>
    <header className="home_header">
      <img src="/KIDsClass/KIDsClass_logo.png"></img>
    </header>

    <div className="a_box">
      <div className="home_center">
        <p>クラス分けに速度と安心を</p>
        <img src="/KIDsClass/KIDsClass_logo-white.png"></img>
        <div className="click_box"
          onClick={() =>{
            setShowOverlay(!showOverlay);
          }}>
          <p>.csv .xls .xlsx でクラス分けする</p>
          <img src="/KIDsClass/green-arrow.png"></img>
        </div>
      </div>
      <div className="csvGenerateButton" onClick={handleCSVDownload}>CSVDLはここ</div>
    </div>

    


    <FileDropOverlay   show={showOverlay}    onClose={() => setShowOverlay(false)}  onFileLoaded={(file)=>{setRawFile(file),setShowOverlay(false),setShowDetail(true)}}/>  {/*ここに書いた中身はそのまま実行される.*/}
    <FileDetailOverlay show={showFileDetail} onClose={() => setShowDetail(false)}   rawFile={rawFile} setCleansingData={() => setCleandData(cleanedData)} cleanedData={cleanedData}/>
    <FileSetupOverlay  show={showFileSetup}  onClose={() => setShowSetup(false)}    cleanedData={cleanedData}/>
    </>
  );
}
export default Home


///////////////////////
//Home
//→FileDropOverlayでFile獲得、"元のFile用"Stateを更新.
//→FileDetailOverlayでFileを表示、元のFile用StateからFileを取得、それをオブジェクトデータに加工、"きれいにしたデータ用"Stateに保存.
//