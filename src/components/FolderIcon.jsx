import React, { useContext, useState } from "react";
import { utilityContext } from "../context/UtilityContext";
import FolderWarning from "./FolderWarning";
import styles from "../styles/modules/folderIcon.module.css";
import FolderContent from "./FolderContent";

import { CgClose } from "react-icons/cg";

function FolderIcon({ folderID, folderTitle, files, notes }) {
  const { setIsMobileNav } = useContext(utilityContext);

  const [showFile, setShowFile] = useState(null);

  const [isWarning, setIsWarning] = useState(false);

  return (
    <>
      {isWarning && (
        <FolderWarning
          folderID={folderID}
          folderTitle={folderTitle}
          setIsWarning={setIsWarning}
        />
      )}
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
            onClick={(e) => {
              e.stopPropagation();
              setIsWarning(true);
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
