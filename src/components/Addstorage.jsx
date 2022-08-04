import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import { appDataContext } from "../context/DataContext";

function Addstorage({ setIsOpen }) {
  const {
    storageTitleInput,
    setstorageTitleInput,
    storageFileInput,
    setstorageFileInput,
    handleAddstorage,
    handleOpenTab,
  } = useContext(appDataContext);

  const newstorage = () => {
    return {
      id: uuid(),
      title: storageTitleInput,
    };
  };
  return (
    <form
      action="/action_page.php"
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

      <input
        type="file"
        name="file-input"
        id="file-input"
        onChange={(e) => setstorageFileInput(e.target.files[0])}
      />

      <button type="submit">add storage</button>
    </form>
  );
}

export default Addstorage;
