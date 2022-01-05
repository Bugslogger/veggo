import React, { useEffect } from "react";
import { order } from "../../data";
import { OrderCard } from "../Card/Card";
import './style.css';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user)=>{
      if(user){
        // navigate("")
      } else {
        navigate('/');
      }
    })
  }, []);

  return (
    <div className="order-page-container">
      <div className="order-page-subheader">Your Order On The Way</div>
      <div className="live-order-conatiner">
        {order.slice(0, 1).map((data, index) => {
          return (
            <OrderCard
              key={index + 1}
              itemImage={data.itemImage}
              itemName={data.itemName}
              itemPrice={data.itemPrice * data.qty}
              qty={data.qty}
              show="Track Order"
            />
          );
        })}
      </div>
      <div style={{marginTop: "40px"}} className="order-page-subheader">Previous Order</div>
      <div className="prev-order-conatiner">
        {order.map((data, index) => {
          return (
            <OrderCard
              key={index + 1}
              itemImage={data.itemImage}
              itemName={data.itemName}
              itemPrice={data.itemPrice * data.qty}
              qty={data.qty}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Order;
