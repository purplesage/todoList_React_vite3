import React, { useState, useContext } from "react";
import { CgClose } from "react-icons/cg";
import styles from "../styles/modules/addFileForm.module.css";
import { appDataContext } from "../context/DataContext";
import { v4 as uuid } from "uuid";
import { HiOutlineCloudUpload } from "react-icons/hi";
import LoadingButton from "@mui/lab/LoadingButton";

function AddFileForm({ setShowFileInputs, title, id }) {
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");

  const { uploadToStorage, handleAddFile, isUploading } =
    useContext(appDataContext);

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
      className={styles.addFileForm}
      onSubmit={(e) => {
        e.preventDefault();
        uploadToStorage(newFileObject(), title);
        handleAddFile(id, newFileObject(true));
        setShowFileInputs(false);
      }}
    >
      <button
        className={styles.close}
        type="button"
        onClick={() => setShowFileInputs(false)}
      >
        <CgClose />
      </button>
      <input
        value={fileTitle}
        onChange={(e) => setFileTitle(e.target.value)}
        placeholder="File title:"
        type="text"
        name="note-title"
        id="note-title"
        maxLength="25"
        autoComplete="off"
      />
      <input
        type="file"
        name="file-input"
        id="file-input"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <LoadingButton
        startIcon={<HiOutlineCloudUpload />}
        variant="outlined"
        type="submit"
        loading={isUploading}
      >
        Upload
      </LoadingButton>
    </form>
  );
}

export default AddFileForm;
