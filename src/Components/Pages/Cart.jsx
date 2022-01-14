import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AddressCard, AddressForm } from "../Card/Card";
import { AddItem, RemoveItem } from "../Redux/Action";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import "./style.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const cartItem = useSelector((state) => state.addToCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setstate] = useState([]);
  const [currentUserId, setcurrentUserId] = useState([]);
  const [showForm, setshowForm] = useState({
    form: false,
    unit: false,
    inputValue: "",
    checkAuth: false,
  });
  const [Address, setAddress] = useState([
    {
      form: {
        Name: "sarfaraj shah",
        phoneNumber: "7219110733",
        houseNumber: "52",
        areaName: "hingna road",
        city: "Nagpur",
        areaPincode: 440016,
        state: "maharashtra",
      },
      id: "001",
    },
  ]);
  const [formData, setformData] = useState({});
  let sum = 0;

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setshowForm({ ...showForm, checkAuth: false });
        getDocs(collection(getFirestore(), "orders")).then((doc) => {
          doc.forEach((docs) => {
            setstate((state) => [...state, { data: docs.data(), id: docs.id }]);
          });
        });
      } else {
        setshowForm({ ...showForm, checkAuth: true });
      }
    });
  }, []);

  function DeliverToAddress(e) {
    console.log(e.target.id);
    let userAdd = Address.find((x) => x.id === e.target.id);
    console.log(userAdd);
    setcurrentUserId(currentUserId=>[...currentUserId, userAdd]);
    console.log(currentUserId);
  }

  const getOrder = () => {
    let Auth = getAuth().currentUser;
    if (showForm.checkAuth) {
      navigate("/login");
    } else {
      let checkID = state.find((userID) => userID.id === Auth.uid);
      if (!checkID) {
        setDoc(doc(getFirestore(), "orders", Auth.uid), {
          userID: Auth.uid,
          username: Auth.displayName,
          orders: [
            {
              product: [cartItem.cart],
              address: [
                {
                  Name: currentUserId.Name,
                  phoneNumber: currentUserId.phoneNumber,
                  houseNumber: currentUserId.houseNumber,
                  areaName: currentUserId.areaName,
                  city: currentUserId.city,
                  areaPincode: currentUserId.areaPincode,
                  state: currentUserId.state,
                },
              ],
            },
          ],
        });
      } else {
        updateDoc(doc(getFirestore(), "orders", Auth.uid), {
          orders: [
            ...checkID.data.orders,
            {
              product: [cartItem.cart],
              address: [
                {
                  Name: currentUserId.Name,
                  phoneNumber: currentUserId.phoneNumber,
                  houseNumber: currentUserId.houseNumber,
                  areaName: currentUserId.areaName,
                  city: currentUserId.city,
                  areaPincode: currentUserId.areaPincode,
                  state: currentUserId.state,
                },
              ],
            },
          ],
        });
      }
    }
  };

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
      setAddress((Address) => [
        ...Address,
        { form: formData, id: Math.floor(Math.random() * 999) },
      ]);
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
                    // console.log(address);
                    return (
                      <AddressCard
                        key={`00${index}`}
                        ID={address.id}
                        name={address.form.Name}
                        tel={address.form.phoneNumber}
                        city={address.form.city}
                        state={address.form.state}
                        hn={address.form.houseNumber}
                        address={address.form.areaName}
                        areaPincode={address.form.areaPincode}
                        click={DeliverToAddress}
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
                  <div onClick={getOrder} className="crc-i-tp-wd">
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
