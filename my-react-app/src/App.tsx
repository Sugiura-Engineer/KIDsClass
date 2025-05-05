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
