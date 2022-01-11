import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import "./admin.css";
import AddProduct from "./AddProduct";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="ad-left-container">
        <div className="adl-drawer">
          <div className="adl-icon-text-container">
            <div className="adl-icon">
              <AddCircleOutlineIcon style={{color: "inherit"}} />
            </div>
            <div className="adl-text">Add Product</div>
          </div>

          <div className="adl-icon-text-container">
            <div className="adl-icon">
              <ListAltIcon style={{color: "inherit"}} />
            </div>
            <div className="adl-text">Product List</div>
          </div>

          <div className="adl-icon-text-container">
            <div className="adl-icon">
              <AddShoppingCartIcon style={{color: "inherit"}} />
            </div>
            <div className="adl-text">Order Details</div>
          </div>
          
        </div>
      </div>
      <div className="ad-right-container">
          <AddProduct/>
      </div>
    </div>
  );
};

export default Admin;
