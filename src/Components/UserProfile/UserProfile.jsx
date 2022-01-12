import React, { useState, useEffect } from "react";
import "./userprofile.css";
// import image from "../../images/cover.jpg";
import { ReviewCard } from "../Card/Card";
import { review } from "../../data";
import { Settings } from "@mui/icons-material";
import { AlertDialogSlide } from "../Comp";
import Order from "../Cart/Order";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
} from "@firebase/auth";
import AddProduct from "../../dashboard/AddProduct";

const UserProfile = () => {
  const [Check, setCheck] = useState(false);
  const [pop, setpop] = useState(false);
  const [switchComponent, setswitchComponent] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
  });
  const [Error, setError] = useState({
    email: false,
    phone: false,
    name: false,
    bool: false,
    errorMessage: "",
  });
  const [formData, setformData] = useState({
    name: "",
    tel: "",
    email: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        console.log(user);
        setformData({
          ...formData,
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        });
      } else {
        navigate("/");
      }
    });
  }, []);

  // function is called when user click on logout button
  const Logout = () => {
    signOut(getAuth())
      .then(() => {
        // Sign-out successful.
        navigate("/");
        setError({
          ...Error,
          bool: true,
          errorMessage: "you have been logged out",
        });
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        setError({ ...Error, bool: true, errorMessage: error });
      });
  };

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

  // update user data
  const FormUpdate = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.name !== "" && formData.tel !== "") {
      updateProfile(getAuth().currentUser, {
        displayName: formData.name,
        photoURL:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
      })
        .then(() => {
          console.log("updated name and photo");

          // const auth = getAuth();
          // const user = auth.currentUser;

          // // TODO(you): prompt the user to re-provide their sign-in credentials
          // const credential = promptForCredentials();

          // reauthenticateWithCredential(user, credential)
          //   .then(() => {
          //     // User re-authenticated.
          //   })
          //   .catch((error) => {
          //     // An error ocurred
          //     // ...
          //   });

          updateEmail(getAuth().currentUser, formData.email)
            .then(() => {
              console.log("email updated");
              setError({
                ...Error,
                bool: true,
                errorMessage: "email and name updated",
              });
              setCheck(false);
            })
            .catch((error) => {
              setError({ ...Error, bool: true, errorMessage: error });
              console.log("error", error);
            });
        })
        .catch((error) => {
          console.log("Error: ", error);
          setError({ ...Error, bool: true, errorMessage: error });
        });
    } else {
      alert("empty field");
    }
  };
  // console.log(playloadValue);
  // displays on mobile view
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
                four: false,
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
                four: false,
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
                four: false,
                two: false,
              })
            }
            style={{ color: switchComponent.three ? "#48A14D" : null }}
            className="up-list"
          >
            Reviews
          </li>
          <li
            onClick={() =>
              setswitchComponent({
                ...switchComponent,
                four: true,
                three: false,
                one: false,
                two: false,
              })
            }
            style={{ color: switchComponent.four ? "#48A14D" : null }}
            className="up-list"
          >
            Add Product
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
                      four: false,
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
                      four: false,
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
                      four: true,
                    });
                    setpop(false);
                  }}
                  style={{ color: switchComponent.three ? "#48A14D" : null }}
                  className="tooltip-border"
                >
                  Reviews
                </li>
                <li
                  onClick={() => {
                    setswitchComponent({
                      ...switchComponent,
                      two: false,
                      three: false,
                      one: false,
                      four: true,
                    });
                    setpop(false);
                  }}
                  style={{ color: switchComponent.four ? "#48A14D" : null }}
                  className="tooltip-border"
                >
                  Add Item
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {switchComponent.one ? (
          <div className="up-profile-container">
            <div className="up-image-container">
              <img src={formData.image} alt="" className="user-image" />
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
                  color: "grey",
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
                  color: "grey",
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
                  color: "grey",
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
                onClick={Logout}
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
        {/* add product */}
        {switchComponent.four ? <div style={{
          width: "100%",
          height: "auto",
          margin: "20px 0 50px 0",
          padding: "0 5px 20px 5px"

        }} className="addproduct"> <AddProduct verified = {false} /> </div>: null}
      </div>
      <AlertDialogSlide
        errorText={Error.errorMessage}
        handleClose={CloseDialogue}
        bool={Error.bool}
      />
    </div>
  );
};

export default UserProfile;
