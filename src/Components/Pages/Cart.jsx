import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddressCard, AddressForm } from "../Card/Card";
import "./style.css";

export const Cart = () => {

    const [showForm, setshowForm] = useState(false);
    const [formData, setformData] = useState({});

    const AddAddress = () =>{
        if(showForm){
            setshowForm(false);
        } else {
            setshowForm(true);
        }
        console.log("formData", formData);
    }

    const inputChange = (e) =>{
        console.log(`key: ${e.target.name}\n value: ${e.target.value}`)
        setformData({...formData, [e.target.name]: e.target.value});
    }

  return (
    <div className="cart-container">
      {/* <div className="no-item-in-cart">
                Your Cart Is Empty Buy Some Healthy Veggies 
                <Link to="/" >
                    <button className="niic-btn">
                        Add Veggies
                    </button>
                </Link>
            </div> */}
      <div className="cart-left-container">
        <div className="clc-address">
          <div className="clc-ac">
            <AddressCard />
            <AddressCard />
            <AddressCard />
            <AddressCard />
            <AddressCard />
          </div>
          <button onClick={AddAddress} className="address-add">Add New Address</button>
        </div>
        {showForm ? <div className="af-container">
          <h2 className="af-title">Add New Address</h2>
          <AddressForm change={inputChange} click={AddAddress} />
        </div>:null}
      </div>
      <div className="cart-right-container">
        <div className="cr-bill-container">
          <div className="cr-item-container">
            <div className="cr-item-card">
              <div className="cr-item-shop">
                <img src="" alt="" className="cr-image" />
                <div className="shope-name">name of shop</div>
              </div>
              <div className="cr-item-info">
                <div className="cr-item-name">item names</div>
                <div className="cr-item-qty">
                  <span>2</span>
                  <select name="unit" id="unit">
                    <option value="gram">g</option>
                    <option value="kilogram">kg</option>
                  </select>
                </div>
                <div className="cr-item-price">
                  <CurrencyRupee style={{ fontSize: "16px" }} /> 1299
                </div>
              </div>
            </div>
            <div className="crc-d">
              <input
                className="crc-input"
                type="text"
                placeholder="Enter Discount Code Here"
              />
              <button className="crc-btn">Apply</button>
            </div>
            <div className="crc-bill-container">
              <div className="crc-item-tp">
                <span>Item Name</span> 1200
              </div>
              <div className="crc-item-df">
                <span>Delivery Fees</span>29
              </div>
              <div className="crc-item-tax">
                <span>Tax </span>49
              </div>
              <div className="crc-tp">
                <p className="tp-text">Total</p>
                <div className="tp-price">1278</div>
              </div>
              <div className="crc-item-d">
                <p className="d-text">Discount</p>
                <p className="d-price">25</p>
              </div>
              <div className="crc-i-tp-wd">
                <p className="topay-btn"> To Pay</p>
                <p className="tp-wd-text">1253</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
