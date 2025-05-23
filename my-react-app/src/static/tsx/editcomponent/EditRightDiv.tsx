type props={
  clickClassfication:(classNumber:Number)=>void;
}

export default function EditRightDiv({clickClassfication}:props){
  
  
  return(
    <div className="right-Container">
      <label>クラス数<input type="number" /></label>
      <button onClick={() => clickClassfication}>クラス分けを実行</button>
    </div>
  )
}