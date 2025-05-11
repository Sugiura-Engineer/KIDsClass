import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./static/tsx/Home.tsx";
import Edit from "./static/tsx/Edit.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/KIDsClass/" element={<Home />} />
        <Route path="/KIDsClass/Edit/" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


//Homeがトップページ.
//Homeの上でFileDropOverlayを開いてファイルの選択を行い、ファイル情報をStateでHomeに戻す.
//ファイル情報が入ったらHomeからFileDetailOVerlayを開き、StateからFile情報を入手、cleansingしたデータをStateで保存、表示して確認する.