type Props = {
  rawFile:File|null;
}

export default function EditCenterDiv({rawFile}:Props){
  return(
    <div className="centerContainer">
      <div className="centerHeader">
        {rawFile?.name}
      </div>
      <div className="centerDisplay"></div>
    </div>
  )
}