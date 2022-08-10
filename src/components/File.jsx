import React, { useState, useContext } from "react";
import { appDataContext } from "../context/DataContext";
import { MdOpenInFull } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import FileEmbed from "./FileEmbed";

function File({
  fileTitle,
  fileName,
  storageTitle,
  storageId,
  fileId,
  embedClass,
  embedGridClass,
}) {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [fetchFileUrl, setFetchFileUrl] = useState("");

  const { fetchFile, handleDeleteFile, deleteFileFromStorage } =
    useContext(appDataContext);

  return (
    <>
      <h2>{fileTitle}</h2>
      <p>
        <i>{fileName}</i>
      </p>
      <FileEmbed
        isEmbedOpen={isEmbedOpen}
        fetchFileUrl={fetchFileUrl}
        embedClass={embedClass}
        fileTitle={fileTitle}
        embedGridClass={embedGridClass}
        setIsEmbedOpen={setIsEmbedOpen}
      />
      {/* {isEmbedOpen && <iframe src={fetchFileUrl}>link test </iframe>} */}
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
          handleDeleteFile(fileId, storageId);
          deleteFileFromStorage(storageTitle, fileTitle, fileName);
        }}
      >
        <BsFillTrashFill />
      </button>
    </>
  );
}

export default File;
