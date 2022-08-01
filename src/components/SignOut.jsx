import React from "react";
import { signOut } from "firebase/auth";
import { ImExit } from "react-icons/im";
import { auth } from "../util/firebaseConfig";

function SignOut({ className }) {
  return (
    <>
      <ImExit
        className={className}
        type="button"
        onClick={() => {
          signOut(auth);
          //refreshes the page after signout.
          window.location.reload(false);
        }}
      />
    </>
  );
}

export default SignOut;
