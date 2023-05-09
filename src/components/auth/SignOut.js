import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <button onClick={userSignOut} className="hover:text-white transition duration-150">
      Sign Out
    </button>
  );
};

export default SignOut;
