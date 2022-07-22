import React from "react";
import { BsJournalCheck } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { ImExit } from "react-icons/im";
import { auth } from "../util/firebaseConfig";

export default function Header() {
  return (
    <header className="header">
      <h1>
        // TO-DO <BsJournalCheck />{" "}
      </h1>

      <div className="left-items">
        <ImExit
          className="exit"
          type="button"
          onClick={() => {
            signOut(auth);
            //refreshes the page after signout.
            window.location.reload(false);
          }}
        />
        <p>Sign out</p>
      </div>
    </header>
  );
}
