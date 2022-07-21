import React from "react";
import { BsJournalCheck } from "react-icons/bs";
import { app } from "../util/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(app);

export default function Header() {
  return (
    <header className="header">
      <h1>
        // TO-DO <BsJournalCheck />{" "}
      </h1>
      <button
        type="button"
        onClick={() => {
          signOut(auth);
          //refreshes the page after signout.
          window.location.reload(false);
        }}
      >
        Sign Out
      </button>
    </header>
  );
}
