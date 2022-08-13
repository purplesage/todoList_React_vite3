import React, { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { appDataContext } from "../context/DataContext";
import styles from "../styles/modules/folderIcon.module.css";
import FolderContent from "./FolderContent";

function FolderIcon({ folderID, folderTitle, files, notes }) {
  const { handleDeletefolder, setIsMobileNav, deleteFolderFromStorage } =
    useContext(appDataContext);
  const [showFile, setShowFile] = useState(null);

  return (
    <>
      <li
        className={styles.folder}
        onClick={() => {
          setShowFile(true);
          setIsMobileNav(false);
        }}
      >
        <div className={styles.folderDiv}>
          <h1>{folderTitle}</h1>
          <button
            type="button"
            onClick={() => {
              handleDeletefolder(folderID);
              deleteFolderFromStorage(folderTitle);
            }}
          >
            <CgClose />
          </button>
        </div>
      </li>
      {showFile && (
        <FolderContent
          folderTitle={folderTitle}
          showFile={showFile}
          setShowFile={setShowFile}
          notes={notes}
          files={files}
          folderID={folderID}
        />
      )}
    </>
  );
}

export default FolderIcon;
