//開くトップページ.
import {Link} from "react-router-dom";
import "../css/Home.css";

function Home() {
  return ( 
    <>

    <div className="a_box">
      <div className="home_center">
          <img src="./KIDsClass_logo.png"></img>
          <div className="click_box">
            <Link to="/KIDsClass/Edit/">
              <p>Excel・csvデータでクラス分けする</p>
            </Link>
          </div>
      </div>
    </div>
    </>
  )
}

export default Home
