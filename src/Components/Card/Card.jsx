import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
// import image from "../../images/image.jpg";
import "./card.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Add, Delete, Edit, Star } from "@mui/icons-material";

const styles = {
  rupees: {
    fontSize: "1em",
    color: "grey",
  },
  edit: {
    margin: "0 8px",
    color: "green",
  },
  del: {
    color: "red",
  },
  star: {
    fontSize: "0.95em",
    color: "gold",
  },
};

const Card = ({ itemImage, title, rating, desc, price }) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={itemImage} alt={itemImage} className="card-image" />
      </div>
      <div className="card-title-container">
        <div className="card-title">{title}</div>
        <div className="card-rating-container">
          <span>{rating}</span>
          <StarIcon style={{ fontSize: "1em" }} />
        </div>
      </div>
      <div className="card-disc-container">
        <div className="card-desc">{desc}</div>
        <div className="card-price">
          <CurrencyRupeeIcon style={styles.rupees} />
          <span>{price}/kg</span>
        </div>
      </div>
    </div>
  );
};

export const Card2 = ({ itemImage, title, rating, desc, price }) => {
  return (
    <div className="card2-container">
      <div className="card2-image-container">
        <img src={itemImage} alt={title} className="card2-image" />
      </div>
      <div className="card2-title-container">
        <div className="card2-name">{title}</div>
        <div className="card2-rating">
          <Star style={styles.star} />
          <Star style={styles.star} />
          <Star style={styles.star} />
          <Star style={styles.star} />
          <Star style={styles.star} />
        </div>
        <div className="card2-price">
          <CurrencyRupeeIcon style={styles.rupees} /> {price}/kg
        </div>
      </div>
      <div className="card2-button-container">
        <button className="card2-btn">
          Add <Add style={{ fontSize: "1.2em" }} />
        </button>
      </div>
    </div>
  );
};

export const OrderCard = ({ itemImage, itemName, itemPrice, qty, show }) => {
  return (
    <div className="order-card-container">
      <div className="inner-oc-container">
        <div className="oc-image-container">
          <img src={itemImage} alt={itemImage} className="oc-image" />
        </div>
        <div className="oc-text-container">
          <div className="oc-name-container">{itemName}</div>
          <div className="oc-pq-container">
            <div className="oc-p">
              <CurrencyRupeeIcon style={{ fontSize: "1em" }} /> {itemPrice}
            </div>
            <div className="oc-q">{`QTY: ${qty}kg`}</div>
          </div>
          {show ? null : (
            <div className="oc-star">
              <Star style={styles.star} />
              <Star style={styles.star} />
              <Star style={styles.star} />
              <Star style={styles.star} />
              <Star style={styles.star} />
            </div>
          )}
        </div>
      </div>
      {show ? (
        <div className="oc-bot-btn">
          <div className="oc-left-btn">{show}</div>
        </div>
      ) : (
        <div className="oc-bot-btn">
          <div className="oc-left-btn">Repeat Order</div>
          <div className="oc-right-btn">Write Review</div>
        </div>
      )}
    </div>
  );
};

export const ReviewCard = ({ image, username, review }) => {
  const [editShow, seteditShow] = useState(false);

  window.onload = () => {
    let rcClass = document.getElementById("hover");
    rcClass.addEventListener("mouseover", (event) => {
      console.log(event);
      seteditShow(true);
    });
    rcClass.addEventListener("mouseleave", () => {
      seteditShow(false);
      // console.log("leave");
    });
  };

  const EditReview = () => {
    console.log("Edit Button Clicked");
  };
  const del = () => {
    console.log("delete");
  };
  // console.log(hover.current.className)

  return (
    <div id="hover" className="rc-container">
      <div className="rc-top-container">
        <div className="rc-user-image">
          <img src={image} alt="" className="userImage" />
        </div>
        <div className="rc-user-name">{username}</div>
        {editShow ? (
          <div className="rc-edit-del-btn">
            <Edit style={styles.edit} onClick={EditReview} />
            <Delete style={styles.del} onClick={del} />
          </div>
        ) : null}
      </div>
      <div className="rc-bottom-container">
        <div className="rc-rating">
          <Star style={styles.star} />
          <Star style={styles.star} />
          <Star style={styles.star} />
          <Star style={styles.star} />
          <Star style={styles.star} />
        </div>
        <div className="rc-text-container">
          <p>{review}</p>
        </div>
      </div>
    </div>
  );
};

// address card
export const AddressCard = () => {
  return (
    <div className="address-container">
      {/* <input type="radio" className="ac-radio" /> */}
      <div className="address">
        <div className="a-name">Sarfaraj Shah</div>
        <div className="a-email">sarfaraj@gmail.com</div>
        <div className="a-phone">0789654231</div>
        <div className="a-address">hingna road, Nagpur - 440016</div>
      </div>
      <button className="a-btn">Deliver To Address</button>
    </div>
  );
};

// add address
export const AddressForm = ({
  click,
  change
}) => {


  return (
    // <div className="af-container">
      <form onSubmit={(event)=> {event.preventDefault()}} className="af-form-container">
        <label>Full Name</label>
        <input required onChange={change} name="Name" type="text" className="input" placeholder="Full Name" />
        <label>Mobile Number</label>
        <input maxLength="10" required onChange={change} name="phoneNumber" type="tel" className="input" placeholder="Enter Your 10 Digit Mobile Number" />
        <label>Flat, House no., Building, Company, Apartment</label>
        <input required onChange={change} name="houseNumber"
          type="text"
          className="input"
          placeholder="Flat, House no., Building, Company, Apartment"
        />
        <label>Area, Colony, Street, Sector, Village</label>
        <input required onChange={change} name="areaName"
          type="text"
          className="input"
          placeholder="Area, Colony, Street, Sector, Village"
        />
        <label>Landmark</label>
        <input onChange={change} name="landmark" type="text" className="input" placeholder="Landmark" />
        <label>Area Pincode</label>
        <input required onChange={change} name="areaPincode"
          type="tel"
          className="input"
          maxLength="6"
          placeholder="Area Pincode"
        />
        <label>City</label>
        <input required onChange={change} name="city" type="text" className="input" placeholder="City" />
        <label>State</label>
        <input required onChange={change} name="state" type="text" className="input" placeholder="State" />
        <input onClick={click} type="submit" className="lp-btn" value="Add Address" />
      </form>
      // {/* <label htmlFor="select">Address Type</label>
      // <select id="at">
      //     <option value="">Select Address Type</option>
      //     <option value="home"></option>
      //     <option value="office"></option>
      // </select> */}
    // {/* </div> */}
  );
};

export default Card;
