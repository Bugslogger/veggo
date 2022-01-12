import React, { useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "./admin.css";
import AddProduct from "./AddProduct";
import OrderList from "./OrderList";

const Admin = () => {

  const [state, setstate] = useState({
    one: true,
    two: false,
    three: false
  });

  return (
    <div className="admin-container">
      <div className="ad-left-container">
        <div className="adl-drawer">
          <div style={{backgroundColor: state.one ? "var(--gClr)" : null, color: state.one ? "#fff" : null}} onClick={()=>setstate({
            one: true,
            two: false,
            three: false
          })} className="adl-icon-text-container">
            <div className="adl-icon">
              <AddCircleOutlineIcon style={{ color: "inherit" }} />
            </div>
            <div className="adl-text">Add Product</div>
          </div>

          <div style={{backgroundColor: state.two ? "var(--gClr)" : null, color: state.two ? "#fff" : null}} onClick={()=>setstate({
            one: false,
            two: true,
            three: false
          })} className="adl-icon-text-container">
            <div className="adl-icon">
              <ListAltIcon style={{ color: "inherit" }} />
            </div>
            <div className="adl-text">Product List</div>
          </div>

          <div style={{backgroundColor: state.three ? "var(--gClr)" : null, color: state.three ? "#fff" : null}} onClick={()=>setstate({
            one: false,
            two: false,
            three: true
          })} className="adl-icon-text-container">
            <div className="adl-icon">
              <AddShoppingCartIcon style={{ color: "inherit" }} />
            </div>
            <div className="adl-text">Order Details</div>
          </div>
        </div>
      </div>
      <div className="ad-right-container">
       {state.one ? <AddProduct verified = {true}/>:null}
        {state.two ? <div className="order-list-table">
          <OrderList />
        </div>:null}
      </div>
    </div>
  );
};

export default Admin;
