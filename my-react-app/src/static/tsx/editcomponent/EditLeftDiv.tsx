import "../../css/css-edit/EditLeftDiv.css"

export default function EditLeftDiv(){
  return(
    <div className="left-Container">
      <div className="left-ControlPanel">
        <div className="circle-Button">名簿</div>
        <div className="circle-Button">席順</div>
        <div className="circle-Button">成績</div>
        <div className="circle-Button">地域</div>
        <div className="circle-Button">その他</div>
      </div>
    </div>
  )
}