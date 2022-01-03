import React from "react";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";


// image slider catagory
const ImageSlider = ({ image, name }) => {
  return (
    <div className="item-container">
      <img src={image} alt="items" className="item-image" />
      <span className="item-name">{name}</span>
    </div>
  );
};


// home indicator
export const Indicator = () => {
  return (
    <div className="hs2-container">
      <div className="hs2-indicator">
        <div className="hs2-ind-one ind-active">
          <div className="ind-one-icon ">
            <DeliveryDiningIcon
              sx={{
                fontSize: "44px",
                color: "#48A14D",
                marginTop: "6px",
              }}
            />
          </div>
          <span className="ind-text">Delivery</span>
        </div>
        <div className="hs2-ind-one">
          <div className="ind-one-icon">
            <DeliveryDiningIcon
              sx={{
                fontSize: "44px",
                color: "rgba(128,128,128,0.50)",
                marginTop: "6px",
              }}
            />
          </div>
          <span className="ind-text">Self-Pickup</span>
        </div>
      </div>
    </div>
  );
};

// filter component
export const Filter = () =>{
  return(
    <div className="filter-container">
      <div className="filter-box"></div>
      <div className="filter-box"></div>
      <div className="filter-box"></div>
      <div className="filter-box"></div>
      <div className="filter-box"></div>
    </div>
  )
}



export default ImageSlider;
