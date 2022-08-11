import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { appDataContext } from "../context/DataContext";
import styles from "../styles/modules/addStorage.module.css";

function Addstorage({ setIsOpen }) {
  const {
    storageTitleInput,
    setstorageTitleInput,
    handleAddstorage,
    handleOpenTab,
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
      onSubmit={(e) => {
        e.preventDefault();
        handleAddstorage(newstorage());
        handleOpenTab("storages21133");
        setIsOpen(false);
      }}
    >
      <input
        required
        autoComplete="off"
        maxLength="30"
        placeholder="Title"
        type="text"
        name="storage-title"
        id="storage-title"
        value={storageTitleInput}
        onChange={(e) => setstorageTitleInput(e.target.value)}
      />

      <button type="submit">add storage</button>
    </form>
  );
}

export default Addstorage;
