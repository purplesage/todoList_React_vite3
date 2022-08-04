import React, { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { appDataContext } from "../context/DataContext";
import styles from "../styles/modules/storageDiv.module.css";
import Storagebody from "./Storagebody";

function StorageDiv({ id, title, file }) {
  const { handleDeletestorage } = useContext(appDataContext);
  const [showFile, setShowFile] = useState(null);

  return (
    <li className={styles.storage}>
      <div className={styles.storageDiv} onClick={() => setShowFile(true)}>
        <h1>{title}</h1>
        <button type="button" onClick={() => handleDeletestorage(id)}>
          <CgClose />
        </button>
      </div>
      {showFile && (
        <Storagebody
          fileSrc={file}
          title={title}
          showFile={showFile}
          setShowFile={setShowFile}
        />
      )}
    </li>
  );
}

export default StorageDiv;
