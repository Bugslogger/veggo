import React, { useState } from "react";
import "./userprofile.css";
import image from "../../images/cover.jpg";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { OrderCard, ReviewCard } from "../Card/Card";
import { order, review } from "../../data";
import { Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../Redux/Action";
import { AlertDialogSlide } from "../Comp";
import Order from "../Cart/Order";

const styles = {
  link: {
    width: "100%",
    height: "auto",
    BorderBottom: "1px solid rgba(128,128,128,0.3)",
  },
};
const UserProfile = () => {
  const playloadValue = useSelector((state) => state.IsLogout);
  const dispatch = useDispatch();

  const [Check, setCheck] = useState(false);
  const [pop, setpop] = useState(false);
  const [switchComponent, setswitchComponent] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [Error, setError] = useState({
    email: false,
    phone: false,
    name: false,
    bool: true,
  });
  const [formData, setformData] = useState({
    name: "",
    tel: "",
    email: "",
  });

  const handleFormValidate = (getName, getValue) => {
    if (getName === "Email") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(getValue)) {
        setformData({ ...formData, email: getValue });
        setError({ ...Error, email: false });
      } else {
        setformData({ ...formData, email: "" });
        setError({ ...Error, email: true });
      }
    } else if (getName === "Phone") {
      let regex =
        /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
      if (regex.test(getValue)) {
        setformData({ ...formData, tel: getValue });
        setError({ ...Error, phone: false });
      } else {
        setformData({ ...formData, tel: "" });
        setError({ ...Error, phone: true });
      }
    } else {
      let textCheck = /^[A-Za-z]+$/;
      if (textCheck.test(getValue)) {
        setformData({ ...formData, name: getValue });
        setError({ ...Error, name: false });
      } else {
        setformData({ ...formData, name: "" });
        setError({ ...Error, name: true });
      }
    }
  };

  const FormUpdate = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.name !== "" && formData.tel !== "") {
      setCheck(false);
      alert("submited");
    } else {
      alert("empty field");
    }
  };
  // console.log(playloadValue);

  const handleSettingClick = () => {
    if (pop) {
      setpop(false);
    } else {
      setpop(true);
    }
  };

  // const LogoutUser = (e) =>{e.preventDefault();}

  const CloseDialogue = () => {
    setError({ ...Error, bool: false });
  };

  return (
    <div className="user-profile-container">
      <div className="up-left-container">
        <ul className="up-list-container">
          <li
            onClick={() =>
              setswitchComponent({
                ...switchComponent,
                one: true,
                two: false,
                three: false,
              })
            }
            style={{ color: switchComponent.one ? "#48A14D" : null }}
            className="up-list"
          >
            Profile
          </li>

          <li
            onClick={() =>
              setswitchComponent({
                ...switchComponent,
                two: true,
                three: false,
                one: false,
              })
            }
            style={{ color: switchComponent.two ? "#48A14D" : null }}
            className="up-list"
          >
            Your orders
          </li>
          <li
            onClick={() =>
              setswitchComponent({
                ...switchComponent,
                three: true,
                one: false,
                two: false,
              })
            }
            style={{ color: switchComponent.three ? "#48A14D" : null }}
            className="up-list"
          >
            Reviews
          </li>
        </ul>
      </div>
      <div className="up-right-container">
        <div className="up-menuicon">
          <Settings
            style={{ fontSize: "2.2em", cursor: "pointer" }}
            onClick={handleSettingClick}
          />
        </div>
        {pop ? (
          <div className="up-menu-pop">
            <div className="up-menu-tooltip-container">
              <ul className="up-list-tooltip">
                <li
                  onClick={() => {
                    setswitchComponent({
                      ...switchComponent,
                      two: false,
                      three: false,
                      one: true,
                    });
                    setpop(false);
                  }}
                  style={{ color: switchComponent.one ? "#48A14D" : null }}
                  className="tooltip-border"
                >
                  Profile
                </li>
                <li
                  onClick={() => {
                    setswitchComponent({
                      ...switchComponent,
                      two: true,
                      three: false,
                      one: false,
                    });
                    setpop(false);
                  }}
                  style={{ color: switchComponent.two ? "#48A14D" : null }}
                  className="tooltip-border"
                >
                  Your orders
                </li>
                <li
                  onClick={() => {
                    setswitchComponent({
                      ...switchComponent,
                      two: false,
                      three: true,
                      one: false,
                    });
                    setpop(false);
                  }}
                  style={{ color: switchComponent.three ? "#48A14D" : null }}
                  className="tooltip-border"
                >
                  Reviews
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {switchComponent.one ? (
          <div className="up-profile-container">
            <div className="up-image-container">
              <img src={image} alt="" className="user-image" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="up-form">
              <label htmlFor="name">Name</label>
              <input
                disabled={!Check}
                autoFocus={!Check}
                onChange={(e) =>
                  handleFormValidate(e.target.name, e.target.value)
                }
                style={{
                  borderColor: Error.name ? "red" : "rgba(128,128,128,0.3)",
                }}
                className="input"
                type="text"
                placeholder="Enter Your Name"
                name="name"
                defaultValue={formData.name}
              />
              <label htmlFor="phone">Mobile Number</label>
              <input
                disabled={!Check}
                onChange={(e) =>
                  handleFormValidate(e.target.name, e.target.value)
                }
                style={{
                  borderColor: Error.phone ? "red" : "rgba(128,128,128,0.3)",
                }}
                className="input"
                type="tel"
                placeholder="Tel: 0987654321"
                name="Phone"
                defaultValue={formData.tel}
              />
              <label htmlFor="email">Email Address</label>
              <input
                disabled={!Check}
                onChange={(e) =>
                  handleFormValidate(e.target.name, e.target.value)
                }
                style={{
                  borderColor: Error.email ? "red" : "rgba(128,128,128,0.3)",
                }}
                className="input"
                type="email"
                placeholder="example@gmail.com"
                name="Email"
                defaultValue={formData.email}
              />
              {Check ? (
                <input
                  onClick={FormUpdate}
                  className="input-btn"
                  type="submit"
                  value="Update"
                />
              ) : (
                <input
                  onClick={(e) => {
                    e.preventDefault();
                    setCheck(true);
                  }}
                  className="input-btn"
                  type="button"
                  value="Edit"
                />
              )}
              <input
                style={{ margin: "0 auto" }}
                onClick={() => {
                  setError({ ...Error, bool: true });
                  dispatch(Logout());
                }}
                className="logout"
                type="submit"
                value="Logout"
              />
            </form>
          </div>
        ) : null}
        {/* order card */}
        {switchComponent.two ? (
          <div className="up-orders-container">
            <Order />
          </div>
        ) : null}

        {/* review */}
        {switchComponent.three ? (
          <div className="up-reviews-container">
            {review.map((data, index) => {
              return (
                <ReviewCard
                  key={index}
                  image={data.userImage}
                  username={data.username}
                  review={data.comnt}
                />
              );
            })}
          </div>
        ) : null}
      </div>
      {Error.bool && playloadValue.isLogout ? (
        <AlertDialogSlide
          errorText={playloadValue.message}
          handleClose={CloseDialogue}
          bool={true}
        />
      ) : null}
    </div>
  );
};

export default UserProfile;
