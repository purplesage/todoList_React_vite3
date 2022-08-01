import React from "react";
import { BsJournalCheck } from "react-icons/bs";
import styles from "../styles/modules/header.module.css";
import MenuButton from "./MenuButton";
import SignOut from "./SignOut";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        // TO-DO <BsJournalCheck />{" "}
      </h1>

      <div className={styles.leftItems}>
        <SignOut className={styles.exit} />
        <p>Sign out</p>
      </div>
      <MenuButton className={styles.menuButton} />
    </header>
  );
}

function ExitButton({ signOut, auth }) {
  return (
    <ImExit
      className={styles.exit}
      type="button"
      onClick={() => {
        signOut(auth); //refreshes the page after signout.

        window.location.reload(false);
      }}
    />
  );
}
