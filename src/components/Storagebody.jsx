import React, { useState, useContext } from "react";
import styles from "../styles/modules/storageBody.module.css";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";
import { appDataContext } from "../context/DataContext";
import { v4 as uuid } from "uuid";

function storagebody({ notes, title, setShowFile, showFile, id }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const { handleAddNote, handleDeleteNote } = useContext(appDataContext);

  const newNote = () => {
    return { title: noteTitle, body: noteBody, id: uuid() };
  };

  return ReactDOM.createPortal(
    <div className={styles.storageGrid}>
      <h1>
        //{title}
        <button
          type="button"
          onClick={() => {
            setShowFile(false);
            console.log("from fileDiv", showFile);
          }}
        >
          <CgClose />
        </button>
      </h1>
      <div className={styles.storageBodyGrid}>
        {notes.length > 0 &&
          notes.map((noteObject) => (
            <div key={noteObject.id} className={styles.note}>
              <h2>{noteObject.title}</h2>
              <p>{noteObject.body}</p>
              <button
                type="button"
                onClick={() => handleDeleteNote(noteObject.id, id)}
              >
                delete note
              </button>
            </div>
          ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNote(id, newNote());
        }}
        className="add"
      >
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
      </form>
    </div>,
    document.getElementById("portal")
  );
}

export default storagebody;
