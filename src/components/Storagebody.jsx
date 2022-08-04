import React from "react";
import styles from "../styles/modules/storageBody.module.css";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";

function storagebody({ fileSrc, title, setShowFile, showFile }) {
  return ReactDOM.createPortal(
    <div
      className={styles.storageGrid}
      // style={{ display: showFile ? "grid" : "none" }}
    >
      <h1>
        //{title}
        <button
          type="button"
          onClick={() => {
            setShowFile(false);
            console.log("from fileDiv", showFile);
          }}
        >
          <CgClose />
        </button>
      </h1>
      <div className={styles.storageBody}>some stuff</div>
    </div>,
    document.getElementById("portal")
  );
}

export default storagebody;
