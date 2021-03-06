import {  useState } from "react";
import "./App.css";
import Head from "./Components/Head/Head";
import SliderMenu from "./Components/MenuSlider/SliderMenu";
import { Items } from "./Components/Pages/Items";
import {Route, Routes} from 'react-router-dom';
import Home from "./Components/Pages/Home";
import UserProfile from "./Components/UserProfile/UserProfile";
import { Cart } from "./Components/Pages/Cart";
import "./firebaseConfig";
import LoginPage from "./Components/Pages/LoginPage";
import Order from "./Components/Cart/Order";
import Admin from "./dashboard/Admin";
// import LogRocket from 'logrocket';

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
        {showMenu ? <SliderMenu click={menuToggle} /> : null}
      </div>
        {/* <Items/> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/items" element={<Items/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/orders" element={<Order/>}/>
          <Route path="/cartorder" element={<Cart/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboad/admin" element={<Admin/>}/>
        </Routes>
    </div>
  );
}

// LogRocket.init('b4hkxv/veggo');

export default App;
