import React from "react";
import { CgClose } from "react-icons/cg";
import styles from "../styles/modules/fileEmbed.module.css";
import { AiOutlineFileText } from "react-icons/ai";

function FileEmbed({ setIsEmbedOpen, fetchFileUrl, fileTitle }) {
  return (
    <div className={styles.embedGrid}>
      <h2 className={styles.title}>
        <p>
          <AiOutlineFileText />
          {fileTitle}{" "}
        </p>

        <button
          className={styles.close}
          type="button"
          onClick={() => setIsEmbedOpen(false)}
        >
          <CgClose />
        </button>
      </h2>
      <iframe className={styles.embedFile} src={fetchFileUrl}>
        link test{" "}
      </iframe>
    </div>
  );
}

export default FileEmbed;
