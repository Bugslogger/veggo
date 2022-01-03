import { useState } from "react";
import "./App.css";
import Head from "./Components/Head/Head";
import SliderMenu from "./Components/MenuSlider/SliderMenu";
import { Items } from "./Components/Pages/Items";
import {Route, Routes} from 'react-router-dom';
import Home from "./Components/Pages/Home";
import UserProfile from "./Components/UserProfile/UserProfile";
import { Cart } from "./Components/Pages/Cart";

function App() {
  const [showMenu, setshowMenu] = useState(false);

  const menuToggle = () => {
    if (showMenu) {
      setshowMenu(false);
    } else {
      setshowMenu(true);
    }
  };

  return (
    <div className="App">
      <div className="app-head-container">
        <Head toggleIcons={showMenu} clickMenu={menuToggle} />
        {showMenu ? <SliderMenu click={showMenu} /> : null}
      </div>
        {/* <Items/> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/items" element={<Items/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/cartorder" element={<Cart/>}/>

        </Routes>
    </div>
  );
}

export default App;
