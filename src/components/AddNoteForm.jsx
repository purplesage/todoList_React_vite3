import React, { useContext, useState } from "react";
import { appDataContext } from "../context/DataContext";
import { v4 as uuid } from "uuid";
import ReactDOM from "react-dom";
import styles from "../styles/modules/addNoteForm.module.css";

function AddNote({ id, setShowNoteInputs }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const { handleAddNote } = useContext(appDataContext);

  const newNote = () => {
    return { title: noteTitle, body: noteBody, id: uuid() };
  };
  return ReactDOM.createPortal(
    <form
      className={styles.addNote}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddNote(id, newNote());
        setShowNoteInputs(false);
      }}
    >
      <button type="button" onClick={() => setShowNoteInputs(false)}>
        close
      </button>
      <input
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Note title:"
        type="text"
        name="note-title"
        id="note-title"
      />
      <textarea
        value={noteBody}
        onChange={(e) => setNoteBody(e.target.value)}
        placeholder="Note body:"
        name="noteBody"
        id="noteBody"
        cols="30"
        rows="10"
      ></textarea>
      <button type="submit">add note</button>
    </form>,
    document.getElementById("portal")
  );
}

export default AddNote;
