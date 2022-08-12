import React from "react";
import StorageDiv from "./StorageDiv";
import styles from "../styles/modules/storageList.module.css";

function storageList({ list }) {
  return (
    <ul className={styles.storageGrid}>
      {list.length > 0 &&
        list.map((listObject) => (
          <StorageDiv
            key={listObject.id}
            storageID={listObject.id}
            storageTitle={listObject.title}
            files={listObject.files}
            notes={listObject.notes}
          />
        ))}
    </ul>
  );
}

export default storageList;
