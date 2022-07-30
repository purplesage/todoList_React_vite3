import React from "react";
import { BsJournalCheck } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { ImExit } from "react-icons/im";
import { auth } from "../util/firebaseConfig";
import styles from "../styles/modules/header.module.css";
import MenuButton from "./MenuButton";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        // TO-DO <BsJournalCheck />{" "}
      </h1>

      <div className={styles.leftItems}>
        <ImExit
          className={styles.exit}
          type="button"
          onClick={() => {
            signOut(auth);
            //refreshes the page after signout.
            window.location.reload(false);
          }}
        />
        <p>Sign out</p>
      </div>
      <MenuButton className={styles.menuButton} />
    </header>
  );
}
