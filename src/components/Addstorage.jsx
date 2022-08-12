import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { appDataContext } from "../context/DataContext";
import styles from "../styles/modules/addStorage.module.css";

function Addstorage({ setIsOpen, setIsProject }) {
  const {
    storageTitleInput,
    setstorageTitleInput,
    handleAddStorage,
    handleOpenTab,
    setIsMobileNav,
  } = useContext(appDataContext);

  const newstorage = () => {
    return {
      id: uuid(),
      title: storageTitleInput,
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
        handleAddStorage(newstorage());
        handleOpenTab("storages21133");
        setIsOpen(false);
        setstorageTitleInput("");
        setIsMobileNav(false);
      }}
    >
      <input
        required
        autoComplete="off"
        maxLength="30"
        placeholder="Folder title:"
        type="text"
        name="storage-title"
        id="storage-title"
        value={storageTitleInput}
        onChange={(e) => setstorageTitleInput(e.target.value)}
      />

      <button type="submit">ADD FOLDER</button>
    </form>
  );
}

export default Addstorage;
