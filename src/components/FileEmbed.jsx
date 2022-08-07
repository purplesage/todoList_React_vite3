import React from "react";
import styles from "../styles/modules/fileEmbed.module.css";

function FileEmbed({ isEmbedOpen, fetchFileUrl }) {
  return (
    <div className={styles.fileEmbed}>
      {isEmbedOpen && <iframe src={fetchFileUrl}>link test </iframe>}
    </div>
  );
}

export default FileEmbed;
