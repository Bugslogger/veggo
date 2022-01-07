import React from "react";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";

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
                fontSize: "34px",
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
                fontSize: "34px",
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
export const Filter = (props) => {

  return (
    <div style={props.style} className="filter-container">
      <div className="filter-box">Filter</div>
      {
        props.filter ? props.filter.map((data,index)=>{
          return(<div key={index + 1} className="filter-box">{data}</div>)
        }):null
      }
    </div>
  );
};

// modal dialogue

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AlertDialogSlide({ errorText, bool, handleClose }) {
  return (
    <div>
      <Dialog
        open={bool}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {errorText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



export default ImageSlider;
