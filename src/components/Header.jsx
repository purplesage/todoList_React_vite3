import React from "react";
import styles from "../styles/modules/header.module.css";
import MenuButton from "./MenuButton";
import SignOut from "./SignOut";

import { BsJournalCheck } from "react-icons/bs";

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
