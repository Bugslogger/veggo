import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./head.css";
import { Close, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const styles = {
  link: {
    height: "100%",
    display: "grid",
    placeItems: "center"
  }
}

const Head = ({ clickMenu, toggleIcons }) => {
  return (
    <div className="head-container">
      <Link style={styles.link} to="/">
        <div className="head-logo-container">Capsikon</div>
      </Link>
      <div className="head-menu-list-container">
        <ul className="list-container">
          <li className="list active">
            <Link to="/" >
              Home
            </Link>
          </li>
          <li className="list">
            <Link to="/profile" >
              profile
            </Link>
          </li>
          <li className="list">
            about
          </li>
          <li className="list">
            Home
          </li>
          <li className="list">
            login
          </li>
        </ul>
        <div className="head-icon-container">
          <div className="cart-icon">
            <Link to="/cartorder"><ShoppingCartIcon
              style={{
                fontSize: "2.4em",
                // color: "#48A14D",
                color: "rgba(128,128,128,0.8)",
                cursor: "pointer",
                marginRight: "20px",
              }}
            /></Link>
            <span className="notify">5</span>
          </div>
          <div className="head-menu-icon-container">
            {toggleIcons ? (
              <Close
                onClick={clickMenu}
                style={{
                  fontSize: "3em",
                  color: "#fff",
                  cursor: "pointer",
                }}
              />
            ) : (
              <Menu
                style={{
                  fontSize: "3em",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={clickMenu}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
