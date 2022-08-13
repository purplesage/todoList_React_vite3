import React, { useState, useContext } from "react";
import { folderListContext } from "../context/FolderListContext";
import styles from "../styles/modules/file.module.css";
import FileEmbed from "./FileEmbed";

import { MdOpenInFull } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function File({ fileTitle, fileName, folderTitle, folderID, fileId }) {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [fetchFileUrl, setFetchFileUrl] = useState("");

  const { fetchFile, handleDeleteFile, deleteFileFromStorage } =
    useContext(folderListContext);

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
            fetchFile(folderTitle, fileName, setFetchFileUrl);
          }}
        >
          <MdOpenInFull /> {"OPEN"}
        </button>
        <button
          type="button"
          onClick={() => {
            handleDeleteFile(fileId, folderID);
            deleteFileFromStorage(folderTitle, fileName);
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
