import React, { useEffect, useState } from "react";
import "./admin.css";
import Img from "./Img";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import CircularIndeterminate from "./Loader";
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const AddProduct = (props) => {
  const [state, setstate] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
  });
  const [Error, setError] = useState({
    image: false,
    name: false,
    price: false,
    category: false,
    class: false,
    btnText: "Add New Product",
    disable: false
  });

  const [user, setuser] = useState({
    id: "",
    username: ""
  });


  useEffect(() => {
    onAuthStateChanged(getAuth(), user=>{
    console.log(user);
    setuser({...user, id: user.uid, username: user.displayName})
    });
  }, [])

  const Change = (e) => {
    console.log(e.target.files[0], e.target.files);
    let url = e.target.files[0];

    if (url && e.target.files) {
      let reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target.result);
        setstate({ ...state, image: e.target.result });
      };

      reader.readAsDataURL(url);
    }
  };

  // validate input
  const Validate = (getValue, getKey) => {
    if (getKey === "price") {
      if (!isNaN(getValue)) {
        setError({ ...Error, [getKey]: false });
        setstate({ ...state, [getKey]: getValue });
      } else {
        setError({ ...Error, [getKey]: true });
      }
    } else {
      let textCheck = /^[A-Za-z]+$/;
      if (textCheck.test(getValue)) {
        setError({ ...Error, [getKey]: false });
        setstate({ ...state, [getKey]: getValue });
      } else {
        setError({ ...Error, [getKey]: true });
      }
    }
  };

  const addProductToFirebase = () => {
    if (
      state.image !== "" &&
      state.name !== "" &&
      state.price !== "" &&
      state.category !== ""
    ) {
      setError({...Error, class: true, disable: true});
      try {
        addDoc(collection(getFirestore(), "post"), {
          image: state.image,
          name: state.name,
          price: state.price,
          tag: state.category,
          verified: props.verified,
          userID: user.id,
          username: user.username,
          timestamp: new Date().getTime()
        })
          .then(() => {
            console.log("added");
            setError({...Error, btnText: "Product Added", class: false});
          })
          .catch((error) => {
            console.log(error); setError({...Error, btnText: "Try Again", class: false});
          });
      } catch (error) {
        console.log(error);
        console.log(error); setError({...Error, btnText: "Try Again", class: false});

      }
    } else {
      console.log("empty");
    }
  };

  return (
    <div className="adr-ap-container">
      <div className="adr-image-add">
        <Img name={state.image} onchange={Change} />
      </div>
      <div className="adr-add-details">
        <label>Product Name</label>
        <input
        disabled = {Error.disable}
          style={{
            borderColor: Error.name ? "red" : null,
            color: Error.name ? "red" : null,
          }}
          onChange={(e) => Validate(e.target.value, e.target.name)}
          type="text"
          className="input"
          placeholder="Enter Your Product Name"
          name="name"
        />
        <label>Price</label>
        <input
        disabled = {Error.disable}
          style={{
            borderColor: Error.price ? "red" : null,
            color: Error.price ? "red" : null,
          }}
          onChange={(e) => Validate(e.target.value, e.target.name)}
          type="text"
          name="price"
          className="input"
          placeholder="Price per kg"
          maxLength="5"
        />
        <label>category</label>
        <input
        disabled = {Error.disable}
          style={{
            borderColor: Error.category ? "red" : null,
            color: Error.category ? "red" : null,
          }}
          name="category"
          onChange={(e) => Validate(e.target.value, e.target.name)}
          type="text"
          className="input"
          placeholder="Ex: potato, capsicum, tomato, etc"
        />
        <button disabled={Error.disable} onClick={addProductToFirebase} className={`lp-btn admin-btn ${Error.disable ? "admin" : null} `}>
        {Error.class ? <CircularIndeterminate />: Error.btnText}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
