import React, { useContext, useState } from "react";
import { folderListContext } from "../context/FolderListContext";
import { utilityContext } from "../context/UtilityContext";
import styles from "../styles/modules/folderIcon.module.css";
import FolderContent from "./FolderContent";

import { CgClose } from "react-icons/cg";

function FolderIcon({ folderID, folderTitle, files, notes }) {
  const { setIsMobileNav } = useContext(utilityContext);
  const { handleDeletefolder, deleteFolderFromStorage } =
    useContext(folderListContext);

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
