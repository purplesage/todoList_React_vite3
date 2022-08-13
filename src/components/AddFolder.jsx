import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { appDataContext } from "../context/DataContext";
import styles from "../styles/modules/addStorage.module.css";

function AddFolder({ setIsOpen, setIsProject }) {
  const {
    folderTitleInput,
    setfolderTitleInput,
    handleAddFolder,
    handleOpenTab,
    setIsMobileNav,
  } = useContext(appDataContext);

  const newfolder = () => {
    return {
      id: uuid(),
      title: folderTitleInput,
      notes: [],
      files: [],
    };
  };

  return (
    <form
      className={styles.addStorageForm}
      onSubmit={(e) => {
        e.preventDefault();
        setIsProject(false);
        handleAddFolder(newfolder());
        handleOpenTab("folders21133");
        setIsOpen(false);
        setfolderTitleInput("");
        setIsMobileNav(false);
      }}
    >
      <input
        required
        autoComplete="off"
        maxLength="30"
        placeholder="Folder title:"
        type="text"
        name="folder-title"
        id="folder-title"
        value={folderTitleInput}
        onChange={(e) => setfolderTitleInput(e.target.value)}
      />

      <button type="submit">ADD FOLDER</button>
    </form>
  );
}

export default AddFolder;
