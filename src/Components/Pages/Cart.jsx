import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AddressCard, AddressForm } from "../Card/Card";
import { AddItem, RemoveItem } from "../Redux/Action";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getFirestore, setDoc, doc} from 'firebase/firestore';
import "./style.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const cartItem = useSelector((state) => state.addToCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showForm, setshowForm] = useState({
    form: false,
    unit: false,
    inputValue: "",
    checkAuth: false,
  });
  const [Address, setAddress] = useState([
    {
      Name: "sarfaraj shah",
      phoneNumber: "7219110733",
      houseNumber: "52",
      areaName: "hingna road",
      city: "Nagpur",
      areaPincode: 440016,
      state: "maharashtra",
    },
  ]);
  const [formData, setformData] = useState({});
  let sum = 0;

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setshowForm({ ...showForm, checkAuth: false });
      } else {
        setshowForm({ ...showForm, checkAuth: true });
      }
    });
  }, []);


  const getOrder = () => {
    let Auth = getAuth().currentUser;
    if (showForm.checkAuth) {
      navigate("/login");
    } else {
      setDoc(doc(getFirestore(), "orders", Auth.uid),{
        userID: Auth.uid,
        username: Auth.displayName,
        userAddress: "",
        prodID: "",
        prodQ: "",
        price: "",
        prodName: "", 
      })
    }
  }

  const Change = (e) => {
    console.log(e.target.value);
    setshowForm({ ...showForm, inputValue: e.target.value });
    if (
      showForm.inputValue === 250 &&
      showForm.inputValue === 500 &&
      showForm.inputValue === 125 &&
      showForm.inputValue === 750
    ) {
      setshowForm({ ...showForm, unit: true });
    } else {
      setshowForm({ ...showForm, unit: false });
    }
  };
  const AddAddress = () => {
    if (formData) {
      setAddress((Address) => [...Address, formData]);
      setshowForm({ ...showForm, form: false });
    }
    console.log("formData", formData);
  };

  const inputChange = (e) => {
    console.log(formData);
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="cart-container">
      {cartItem.cart.length === 0 ? (
        <div className="no-item-in-cart">
          Your Cart Is Empty Buy Some Healthy Veggies
          <Link to="/">
            <button className="niic-btn">Add Veggies</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-left-container">
            <div className="cltop">
              {showForm.checkAuth ? (
                <div className="cl-check-log">
                  <p className="cl-text">
                    You Need To Login Before PLace Your Order
                  </p>
                  <Link to="/login">
                    <button className="cl-check-log-btn">Login</button>
                  </Link>
                </div>
              ) : null}
              <div className="clc-address">
                <div className="clc-ac">
                  {Address.map((address, index) => {
                    return (
                      <AddressCard
                        key={`00${index}`}
                        name={address.Name}
                        tel={address.phoneNumber}
                        city={address.city}
                        state={address.state}
                        hn={address.houseNumber}
                        address={address.areaName}
                        areaPincode={address.areaPincode}
                      />
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    setshowForm({ ...showForm, form: !showForm.form })
                  }
                  className="address-add"
                >
                  Add New Address
                </button>
              </div>
            </div>
            {showForm.form ? (
              <div className="af-container">
                <h2 className="af-title">Add New Address</h2>
                <AddressForm change={inputChange} click={AddAddress} />
              </div>
            ) : null}
          </div>

          <div className="cart-right-container">
            <div className="cr-bill-container">
              <div className="cr-item-container">
                <div className="cr-item-card">
                  <div className="cr-item-shop">
                    <img src="" alt="" className="cr-image" />
                    <div className="shope-name">name of shop</div>
                  </div>
                  {cartItem.cart.map((itemData) => {
                    // console.log("itemData: ", itemData);
                    sum += itemData.price * itemData.qty;
                    return (
                      <div key={itemData.id} className="cr-item-info">
                        <div className="cr-item-name">{itemData.name}</div>
                        <div className="cr-item-qty">
                          <input
                            type="button"
                            onClick={() =>
                              dispatch(AddItem(itemData, cartItem.cart))
                            }
                            className="btn-qty"
                            value="+"
                          />
                          <input
                            onChange={Change}
                            value={itemData.qty}
                            type="list"
                            list="unitlist"
                            name="list"
                            style={{
                              mniWidth: "20px",
                              maxWidth: "40px",
                            }}
                          />

                          <datalist id="unitlist unit">
                            <option value="125" />
                            <option value="250" />
                            <option value="500" />
                            <option value="750" />
                          </datalist>

                          <select name="unit" id="unit">
                            {showForm.unit ? (
                              <option value="gram">g</option>
                            ) : null}
                            <option value="kilogram">kg</option>
                          </select>
                          <input
                            type="button"
                            onClick={() =>
                              dispatch(RemoveItem(itemData, cartItem.cart))
                            }
                            className="btn-qty"
                            value="-"
                          />
                        </div>

                        <div className="cr-item-price">
                          <CurrencyRupee style={{ fontSize: "16px" }} />
                          {itemData.price}
                        </div>
                      </div>
                    );
                  })}
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
                    <span>Total Price</span>
                    {sum}
                  </div>
                  <div className="crc-item-df">
                    <span>Delivery Fees</span>29
                  </div>
                  <div className="crc-item-tax">
                    <span>Tax </span>49
                  </div>
                  <div className="crc-tp">
                    <p className="tp-text">Total</p>
                    <div className="tp-price">{(sum += 49 + 29)}</div>
                  </div>
                  <div className="crc-item-d">
                    <p className="d-text">Discount</p>
                    <p className="d-price">25</p>
                  </div>
                  <div
                    onClick={getOrder}
                    className="crc-i-tp-wd"
                  >
                    <p className="topay-btn"> To Pay</p>
                    <p className="tp-wd-text">{(sum -= 25)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* <AlertDialogSlide
        errorText="You need" bool="" handleClose=""
      /> */}
    </div>
  );
};
