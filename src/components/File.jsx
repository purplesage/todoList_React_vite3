import React, { useState, useContext } from "react";
import { appDataContext } from "../context/DataContext";
import { MdOpenInFull } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../styles/modules/file.module.css";
import FileEmbed from "./FileEmbed";

function File({ fileTitle, fileName, storageTitle, storageID, fileId }) {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [fetchFileUrl, setFetchFileUrl] = useState("");

  const { fetchFile, handleDeleteFile, deleteFileFromStorage } =
    useContext(appDataContext);

  return (
    <>
      <div className={styles.file}>
        <h2>{fileTitle}</h2>
        <p>
          <i>{fileName}</i>
        </p>

        <button
          type="button"
          onClick={() => {
            setIsEmbedOpen(true);
            fetchFile(storageTitle, fileTitle, fileName, setFetchFileUrl);
          }}
        >
          <MdOpenInFull /> {"OPEN"}
        </button>
        <button
          type="button"
          onClick={() => {
            handleDeleteFile(fileId, storageID);
            deleteFileFromStorage(storageTitle, fileTitle, fileName);
          }}
        >
          <BsFillTrashFill />
        </button>
      </div>
      {isEmbedOpen && (
        <FileEmbed
          fetchFileUrl={fetchFileUrl}
          fileTitle={fileTitle}
          setIsEmbedOpen={setIsEmbedOpen}
        />
      )}
    </>
  );
}

export default File;
