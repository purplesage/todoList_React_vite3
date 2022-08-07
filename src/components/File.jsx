import React, { useState, useContext } from "react";
import { appDataContext } from "../context/DataContext";
import FileEmbed from "./FileEmbed";

function File({ fileTitle, fileName, storageTitle, storageId, fileId }) {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [fetchFileUrl, setFetchFileUrl] = useState("");

  const { fetchFile, handleDeleteFile, deleteFileFromStorage } =
    useContext(appDataContext);

  return (
    <>
      <h2>{fileTitle}</h2>
      <h2>{fileName}</h2>
      <FileEmbed isEmbedOpen={isEmbedOpen} fetchFileUrl={fetchFileUrl} />
      {/* {isEmbedOpen && <iframe src={fetchFileUrl}>link test </iframe>} */}
      <button
        type="button"
        onClick={() => {
          setIsEmbedOpen(true);
          fetchFile(storageTitle, fileTitle, fileName, setFetchFileUrl);
        }}
      >
        portal embed
      </button>
      <button
        type="button"
        onClick={() => {
          handleDeleteFile(fileId, storageId);
          deleteFileFromStorage(storageTitle, fileTitle, fileName);
        }}
      >
        delete
      </button>
    </>
  );
}

export default File;
