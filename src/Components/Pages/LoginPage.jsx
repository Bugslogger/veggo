import { FacebookRounded, Google } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import image from "../../images/cover.jpg";
import "./style.css";
import { AlertDialogSlide } from "../Comp";

const LoginPage = () => {
  const [formToggle, setformToggle] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
  });
  const [Error, setError] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    errorText: "",
    errorShow: false,
    auth: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("navigate", navigate);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
      }
    });
  }, []);

  // switching to login and signup
  const ToggleForm = () => {
    if (formToggle) {
      setformToggle(false);
    } else {
      setformToggle(true);
    }
  };

  // close pop dialogue
  const CloseModal = () => {
    if (Error.auth) {
      navigate("/");
    }
    setError({ ...Error, errorShow: false });
  };

  // validating login form input
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
    } else if (getName === "Password") {
      let regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (regex.test(getValue)) {
        console.log(getValue);
        setformData({ ...formData, password: getValue });
        setError({ ...Error, password: false });
      } else {
        setformData({ ...formData, password: "" });
        setError({ ...Error, password: true });
      }
      console.log(getValue);
    } else if (getName === "CPassword") {
      console.log(getValue);
      if (formData.password === getValue) {
        setformData({ ...formData, confirmpassword: getValue });
        setError({ ...Error, confirmpassword: false });
      } else {
        setformData({ ...formData, confirmpassword: "" });
        setError({ ...Error, confirmpassword: true });
      }
    }
  };
  // validation end******************************

  // submit handler start*****************************
  const handleSubmitForm = (e) => {
    let logID = e.target.id;
    console.log(logID);
    if (logID === "login") {
      if (formData.email !== "" && formData.password !== "") {
        // console.log("li");

        const auth = getAuth();
        signInWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            setError({
              ...Error,
              errorText: "You are now Logged In ",
              errorShow: true,
              auth: true,
            });
            // ...
            // console.log(user);
          })
          .catch((error) => {
            const errorMessage = error.message;
            const errorCode = error.code;
            if (errorCode === "auth/user-not-found") {
              setError({
                ...Error,
                errorText:
                  "No Account is associated with this email address, please try with another email address",
                errorShow: true,
              });
            } else {
              setError({ ...Error, errorText: errorMessage, errorShow: true });
              console.log(errorCode, errorMessage);
            }
          });
      } else {
        console.log("empty");

        setError({
          ...Error,
          errorText: "Please fill all the boxes properly",
          errorShow: true,
        });
      }
    } else if (logID === "signup") {
      if (formData.email !== "" && formData.confirmpassword !== "") {
        // console.log("sp");
        const auth = getAuth();
        createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.confirmpassword
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setError({
              ...Error,
              errorText: "Your Account has been created",
              errorShow: true,
            });
            console.log(user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
            setError({ ...Error, errorText: errorMessage, errorShow: true });
          });
      } else {
        setError({
          ...Error,
          errorText: "Please fill all the boxes properly",
          errorShow: true,
        });
        console.log("empty");
      }
    } else {
      console.log("something went wrong..!!!");
    }
  };
  // submit handler end*************************************

  // google authantication start******************************

  const Gauth = () => {
    const auth = getAuth();
    auth.useDeviceLanguage();
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        // console.log("user: ",user+"/n"+"token: ",token+"/n"+"credentials: ", credential);
        setError({
          ...Error,
          errorText:
            "You Are Now Logged In, Buy Healthy Veggies And Stay Healthy.",
          errorShow: true,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(`
        ErrorCode: ${errorCode},
        ErrorMessage: ${errorMessage},
        EmailError: ${email},
        CredentialError: ${credential}
      `);
        setError({ ...Error, errorText: errorMessage, errorShow: true });
      });
  };

  return (
    <div className="lp-container">
      <div className="lp-left-container">
        <img src={image} className="lp-image" alt="login cover" />
        <div className="lp-text-container">
          <h2 className="lp-title">Capsikon</h2>
          <p className="lp-caption">We Deliver Fresh And Healthy Veggies</p>
        </div>
      </div>
      <div className="lp-right-container">
        <h1 className="form-title">
          Capsikon {formToggle ? "Signup" : "Login"}
        </h1>
        <form className="lp-form" method="post">
          <label htmlFor="email">Email</label>
          <input
            placeholder="example@gmail.com"
            style={{
              borderColor: Error.email ? "red" : "",
              color: Error.email ? "red" : "",
            }}
            onChange={(e) => {
              handleFormValidate(e.target.name, e.target.value);
            }}
            type="email"
            name="Email"
            className="input"
          />

          <label htmlFor="password">Password</label>
          <input
            placeholder="password must be greater than 6 digit"
            style={{
              borderColor: Error.password ? "red" : "",
              color: Error.password ? "red" : "",
            }}
            onChange={(e) => {
              handleFormValidate(e.target.name, e.target.value);
            }}
            type="password"
            name="Password"
            className="input"
          />

          {formToggle ? (
            <>
              <label htmlFor="password">Confirm Password</label>
              <input
                placeholder="re-enter your password"
                style={{
                  borderColor: Error.confirmpassword ? "red" : "",
                  color: Error.confirmpassword ? "red" : "",
                }}
                onChange={(e) => {
                  handleFormValidate(e.target.name, e.target.value);
                }}
                type="password"
                name="CPassword"
                className="input"
              />
            </>
          ) : null}

          {formToggle ? (
            <input
              onClick={handleSubmitForm}
              type="button"
              id="signup"
              className="lp-btn"
              value="Signup"
            />
          ) : (
            <input
              onClick={handleSubmitForm}
              type="button"
              id="login"
              className="lp-btn"
              value="Login"
            />
          )}
          <p onClick={ToggleForm} className="lp-form-switch">
            {formToggle
              ? "Already Have Account. Login Here"
              : "Create New Account"}
          </p>
        </form>
        <div className="auth-social-icon">
          <div className="google-auth">
            <Google
              onClick={Gauth}
              style={{
                fontSize: "1em",
                color: "currentColor",
              }}
            />
          </div>
          <div className="facebook-auth">
            <FacebookRounded
              onClick={() =>
                setError({
                  ...Error,
                  errorText:
                    "Facebook Authentication is under Maintainance. developer is working behind..!!!",
                  errorShow: true,
                })
              }
              style={{
                fontSize: "1em",
                color: "currentColor",
              }}
            />
          </div>
        </div>
      </div>
      <AlertDialogSlide
        handleClose={CloseModal}
        errorText={Error.errorText}
        bool={Error.errorShow}
      />
    </div>
  );
};

export default LoginPage;
