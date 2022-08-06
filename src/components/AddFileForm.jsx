import React, { useState, useContext } from "react";
import styles from "../styles/modules/addFileForm.module.css";
import { appDataContext } from "../context/DataContext";
import { v4 as uuid } from "uuid";

function AddFileForm({ setShowFileInputs, title, id }) {
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");

  const { uploadToStorage, handleAddFile } = useContext(appDataContext);

  const newFileObject = (toState) => {
    return {
      id: uuid(),
      title: fileTitle,
      file: !toState ? file : null,
      name: file.name,
    };
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        uploadToStorage(newFileObject(), title);
        handleAddFile(id, newFileObject(true));
        setShowFileInputs(false);
      }}
      className={styles.addFile}
    >
      <button type="button" onClick={() => setShowFileInputs(false)}>
        close
      </button>
      <input
        value={fileTitle}
        onChange={(e) => setFileTitle(e.target.value)}
        placeholder="File title:"
        type="text"
        name="note-title"
        id="note-title"
      />
      <input
        type="file"
        name="file-input"
        id="file-input"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Add file</button>
    </form>
  );
}

export default AddFileForm;
