import React, { useState, useContext } from "react";
import styles from "../styles/modules/storageBody.module.css";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";
import { appDataContext } from "../context/DataContext";
import AddNoteForm from "./AddNoteForm";
import AddFileForm from "./AddFileForm";

function storagebody({ notes, title, setShowFile, showFile, id, files }) {
  const [showNoteInputs, setShowNoteInputs] = useState(false);
  const [showFileInputs, setShowFileInputs] = useState(false);

  const { handleDeleteNote } = useContext(appDataContext);

  return ReactDOM.createPortal(
    <div className={styles.storageGrid}>
      <h1>
        //{title}
        <button
          type="button"
          onClick={() => {
            setShowFile(false);
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

      <div className={styles.storageBodyGrid}>
        {files.length > 0 &&
          files.map((fileObject) => (
            <div key={fileObject.id} className={styles.note}>
              <h2>{fileObject.title}</h2>
              <h2>{fileObject.name}</h2>

              {/* <p>{noteObject.body}</p>
              <button
                type="button"
                onClick={() => handleDeleteNote(noteObject.id, id)}
              >
                delete note
              </button> */}
            </div>
          ))}
      </div>

      <div className={styles.filesDiv}>
        <button type="button" onClick={() => setShowNoteInputs(true)}>
          open-N-inputs
        </button>
        <button type="button" onClick={() => setShowFileInputs(true)}>
          open-F-inputs
        </button>
        {showNoteInputs && (
          <AddNoteForm id={id} setShowNoteInputs={setShowNoteInputs} />
        )}

        {showFileInputs && (
          <AddFileForm
            setShowFileInputs={setShowFileInputs}
            title={title}
            id={id}
          />
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default storagebody;
