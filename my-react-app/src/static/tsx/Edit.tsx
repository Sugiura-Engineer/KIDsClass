//データの編集画面(メインになる部分).

import "../css/Edit.css";
//@ts-ignore
import {classificationAlgorithm} from "../js/classificationAlgorithm.js"
//@ts-ignore
import {csvDisplay} from "../js/csvDisplay"

import {useState,useEffect} from "react";                       //状態を管理するというやつだが、つまりは監視対象を追加設定するようなもの.
import {useLocation,Link} from "react-router-dom";


function Edit(){
  const location = useLocation();
  const [forEditData, setForEditData] = useState([]);
  
  //@ts-ignore
  let classResult = null;
  let displayClassNumber = 0;

  //ロードしてからstate更新でnull回避.
  useEffect(()=>{
    if(location.state.cleanedData.length > 0){
      setForEditData(location.state.cleanedData);
      csvDisplay(location.state.cleanedData,".mainDisplay");
    };
  },[forEditData]);

  const handleClassSplit = () => {
    const result = classificationAlgorithm(3,forEditData);
    classResult = result;
    csvDisplay(result[0].members,".mainDisplay");
  };
  const handleChangeClass = () => {
    if(displayClassNumber <= 1){
      //@ts-ignore
      csvDisplay(classResult[displayClassNumber + 1].members,".mainDisplay");
      displayClassNumber += 1;
    }
    else if(displayClassNumber === 2){
      displayClassNumber = 0;
      //@ts-ignore
      csvDisplay(classResult[0].members,".mainDisplay");
    }
  };
  const handleDisplayStudyGrades = () => {
    const display = document.querySelector(".mainDisplay");
    console.log(display);
    // @ts-ignore
    display.innerHTML = "";

    // @ts-ignore
    const selectedClass = classResult[displayClassNumber].members;

  const subjects = ["国語", "算数", "理科", "社会", "その他"];
  const averages: { [subject: string]: number } = {};

  for (const subject of subjects) {
    let total = 0;
    let count = 0;

    for (const student of selectedClass) {
      const score = Number(student[subject]);
      if (!isNaN(score)) {
        total += score;
        count++;
      }
    }

    averages[subject] = count > 0 ? total / count : 0;
  }

  // @ts-ignore
  display.innerHTML = subjects
    .map((subj) => `${subj}：${averages[subj].toFixed(2)}`)
    .join("<br>");
};



  return(
    <>
      <header className="editHeader">
        <Link to={"/KIDsClass"}><img  className="headImg" src="/KIDsClass//KIDsClass_logo.png"></img></Link>
      </header>
      

      <div className="editWrapper">
        <div className="leftContainer">
          <div className="dispayControlButton">
            <div className="buttonContainer">
              <button className="switchButton" onClick={handleClassSplit}>名簿</button>
              <button className="switchButton">座席</button>
              <button className="switchButton" onClick={handleDisplayStudyGrades}>成績</button>
              <button className="switchButton">地域分布</button>
              <button className="switchButton">その他特徴</button>
            </div>
          </div>
          <div className="mainContainer">
            <div className="classWrapper">
              <div className="displayHeader">
                <button onClick={handleChangeClass}>切り替え</button>
              </div>
              <div className="mainDisplay">
                
              </div>
            </div>
          </div>
        </div>

        <div className="rightContainer">
          <div className="classNumberBox">
            クラス数：
            <input type="number" id="splitClassNumber"></input>
          </div>

          <div className="columnAssignmentBox">
            <div id="place1">性別
              <select>
              <option>--未選択--</option>
              <option>名前</option>
              <option>性別</option>
              <option>居住地域</option>
              <option>リーダー気質</option>
              <option>ピアノ</option>
              <option>国語</option>
              <option>算数</option>
              <option>理科</option>
              <option>社会</option>
              <option>その他</option>
              <option>体力</option>
              <option>社交性</option>
              <option>指導傾向</option>
              <option>家庭対応</option>
            </select></div>
            <div id="place2">ピアノ
              <select>
              <option>--未選択--</option>
              <option>名前</option>
              <option>性別</option>
              <option>居住地域</option>
              <option>リーダー気質</option>
              <option>ピアノ</option>
              <option>国語</option>
              <option>算数</option>
              <option>理科</option>
              <option>社会</option>
              <option>その他</option>
              <option>体力</option>
              <option>社交性</option>
              <option>指導傾向</option>
              <option>家庭対応</option>
            </select></div>
          </div>
          <button onClick={handleClassSplit}>クラス分けをする</button>
        </div>
      </div>

    </>
  )
}



export default Edit