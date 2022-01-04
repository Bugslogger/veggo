import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export const Logout = () => (dispatch) => {
  signOut(getAuth())
    .then(() => {
      // Sign-out successful.
      dispatch({
        type: "LOGOUT_SUCCESS",
        playload: {
          isLogout: true,
          message: "You Have Been Logged Out",
        },
      });
    })
    .catch((error) => {
      // An error happened.
      dispatch({
        type: "LOGOUT_FAILED",
        playload: {
          isLogout: false,
          message: "something went wrong",
        },
      });
    });
};

export const chekcAuth =()=>(dispatch)=>{
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        dispatch({
          type: "USER_LOGGED",
          credentials: {
            phone: user.phoneNumber,
            token: user.accessToken,
            userInfo: user.reloadUserInfo
          },
          auth: true,
          message: "You are logged in",
        })
        // console.log("if: ",user);
      } else {
        console.log("else: ",user);
        dispatch({
          type: "USER_NOT_LOGGED",
          credentials: null,
          message: "You need to login",
        })
      }
    });
}