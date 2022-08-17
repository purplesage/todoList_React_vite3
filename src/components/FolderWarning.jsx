import React, { useContext } from "react";
import { folderListContext } from "../context/FolderListContext";
import styles from "../styles/modules/folderWarning.module.css";

import { CgClose } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";

function FolderWarning({ folderID, folderTitle, setIsWarning }) {
  const { handleDeletefolder, deleteFolderFromStorage } =
    useContext(folderListContext);
  return (
    <div className="dark-overlay">
      <form
        className={styles.folderWarningForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleDeletefolder(folderID);
          deleteFolderFromStorage(folderTitle);
          setIsWarning(false);
        }}
      >
        <h2>Warning!</h2>
        <p>
          Deleting this folder will also wipe everything withing it from the
          database.
        </p>
        <p>Do you wish to continue?</p>
        <div className={styles.actionButtons}>
          <button type="submit">
            <AiOutlineCheck />
          </button>
          <button type="button" onClick={() => setIsWarning(false)}>
            <CgClose />
          </button>
        </div>
      </form>
    </div>
  );
}

export default FolderWarning;
