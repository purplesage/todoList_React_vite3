import React, { useContext, useState } from "react";
import { folderListContext } from "../context/FolderListContext";
import ReactDOM from "react-dom";
import styles from "../styles/modules/addNoteForm.module.css";

import { v4 as uuid } from "uuid";
import { CgClose } from "react-icons/cg";

function AddNoteForm({ folderID, setShowNoteInputs }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const { handleAddNote } = useContext(folderListContext);

  const newNote = () => {
    return { title: noteTitle, body: noteBody, id: uuid() };
  };
  return ReactDOM.createPortal(
    <form
      className={styles.addNote}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddNote(folderID, newNote());
        setShowNoteInputs(false);
      }}
    >
      <div className={styles.headerDiv}>
        <button type="button" onClick={() => setShowNoteInputs(false)}>
          <CgClose />
        </button>
        <input
          autoComplete="off"
          required
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Note title:"
          type="text"
          name="note-title"
          id="note-title"
        />
      </div>

      <textarea
        required
        value={noteBody}
        onChange={(e) => setNoteBody(e.target.value)}
        placeholder="Note body:"
        name="noteBody"
        id="noteBody"
      ></textarea>
      <button type="submit">add note</button>
    </form>,
    document.getElementById("portal")
  );
}

export default AddNoteForm;
