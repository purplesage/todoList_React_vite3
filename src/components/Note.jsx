import React, { useState, useContext } from "react";
import { CgClose } from "react-icons/cg";
import styles from "../styles/modules/note.module.css";
import { appDataContext } from "../context/DataContext";

function Note({ noteId, noteTitle, storageID, noteBody }) {
  const [modalStyle, setModalStyle] = useState(false);

  const { handleDeleteNote } = useContext(appDataContext);

  const customStyle = () => {
    return {
      position: "absolute",
      top: "35vh",
      right: "40vw",
      border: "rgb(163, 45, 110) 4px dashed",
      transform: "scale(1.3)",
    };
  };

  return (
    <div
      style={modalStyle ? customStyle() : null}
      onDoubleClick={() => setModalStyle(!modalStyle)}
      className={styles.note}
    >
      <div className={styles.noteTitleDiv}>
        <h2>{noteTitle}</h2>
        <button
          type="button"
          onClick={() => handleDeleteNote(noteId, storageID)}
        >
          <CgClose />
        </button>
      </div>
      <p>{noteBody}</p>
    </div>
  );
}

export default Note;
