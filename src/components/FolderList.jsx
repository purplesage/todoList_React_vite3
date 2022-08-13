import React from "react";
import FolderIcon from "./FolderIcon";
import styles from "../styles/modules/folderList.module.css";

function FolderList({ list }) {
  return (
    <ul className={styles.folderGrid}>
      {list.length > 0 &&
        list.map((listObject) => (
          <FolderIcon
            key={listObject.id}
            folderID={listObject.id}
            folderTitle={listObject.title}
            files={listObject.files}
            notes={listObject.notes}
          />
        ))}
    </ul>
  );
}

export default FolderList;
