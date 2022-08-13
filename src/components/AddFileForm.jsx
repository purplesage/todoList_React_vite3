import React, { useState, useContext } from "react";
import styles from "../styles/modules/addFileForm.module.css";
import { folderListContext } from "../context/FolderListContext";

import { CgClose } from "react-icons/cg";
import { v4 as uuid } from "uuid";
import { ImCloudUpload } from "react-icons/im";
import LoadingButton from "@mui/lab/LoadingButton";

function AddFileForm({ setShowFileInputs, folderTitle, folderID }) {
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");

  const { uploadToStorage, handleAddFile, isUploading } =
    useContext(folderListContext);

  const newFileObject = (toState) => {
    return {
      id: uuid(),
      title: fileTitle,
      file: !toState ? file : null,
      name: file.name,
    };
  };

  const fileToAdd = () => {
    handleAddFile(folderID, newFileObject(true));
  };

  return (
    <form
      className={styles.addFileForm}
      onSubmit={(e) => {
        e.preventDefault();
        uploadToStorage(
          newFileObject(),
          folderTitle,
          fileToAdd,
          setShowFileInputs
        );
        // setShowFileInputs(false);
      }}
    >
      <button
        disabled={isUploading}
        className={styles.close}
        type="button"
        onClick={() => setShowFileInputs(false)}
      >
        <CgClose />
      </button>
      <input
        disabled={isUploading}
        required
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
        disabled={isUploading}
        required
        type="file"
        name="file-input"
        id="file-input"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <LoadingButton
        startIcon={!isUploading ? <ImCloudUpload /> : null}
        endIcon={null}
        variant="outlined"
        type="submit"
        loading={isUploading}
        sx={{
          fontWeight: "bold",
          width: "9rem",
          svg: { color: "#1976d2" },
        }}
      >
        Upload
      </LoadingButton>
    </form>
  );
}

export default AddFileForm;
