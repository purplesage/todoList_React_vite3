import React, { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { appDataContext } from "../context/DataContext";
import styles from "../styles/modules/storageDiv.module.css";
import Storagebody from "./Storagebody";

function StorageDiv({ storageID, storageTitle, files, notes }) {
  const { handleDeletestorage, setIsMobileNav, deleteFolderFromStorage } =
    useContext(appDataContext);
  const [showFile, setShowFile] = useState(null);

  return (
    <>
      <li
        className={styles.storage}
        onClick={() => {
          setShowFile(true);
          setIsMobileNav(false);
        }}
      >
        <div className={styles.storageDiv}>
          <h1>{storageTitle}</h1>
          <button
            type="button"
            onClick={() => {
              handleDeletestorage(storageID);
              deleteFolderFromStorage(storageTitle);
            }}
          >
            <CgClose />
          </button>
        </div>
      </li>
      {showFile && (
        <Storagebody
          storageTitle={storageTitle}
          showFile={showFile}
          setShowFile={setShowFile}
          notes={notes}
          files={files}
          storageID={storageID}
        />
      )}
    </>
  );
}

export default StorageDiv;
