import React, { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { appDataContext } from "../context/DataContext";
import styles from "../styles/modules/storageDiv.module.css";
import Storagebody from "./Storagebody";

function StorageDiv({ id, title, files, notes }) {
  const { handleDeletestorage } = useContext(appDataContext);
  const [showFile, setShowFile] = useState(null);

  return (
    <>
      <li className={styles.storage} onClick={() => setShowFile(true)}>
        <div className={styles.storageDiv}>
          <h1>{title}</h1>
          <button type="button" onClick={() => handleDeletestorage(id)}>
            <CgClose />
          </button>
        </div>
      </li>
      {showFile && (
        <Storagebody
          title={title}
          showFile={showFile}
          setShowFile={setShowFile}
          notes={notes}
          files={files}
          id={id}
        />
      )}
    </>
  );
}

export default StorageDiv;
