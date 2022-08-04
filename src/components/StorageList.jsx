import React from "react";
import StorageDiv from "./StorageDiv";
import styles from "../styles/modules/storageList.module.css";

function storageList({ list, emptyMessage }) {
  return (
    <ul className={styles.storageGrid}>
      {list.length > 0
        ? list.map((listObject) => (
            <StorageDiv
              key={listObject.id}
              id={listObject.id}
              title={listObject.title}
              file={listObject.file}
            />
          ))
        : emptyMessage}
    </ul>
  );
}

export default storageList;
