import React from "react";
import styles from "../styles/modules/notification.module.css";

function Notification({ message, display }) {
  return (
    <div
      style={display ? { display: "flex" } : null}
      className={styles.notification}
    >
      {message}
    </div>
  );
}

export default Notification;
