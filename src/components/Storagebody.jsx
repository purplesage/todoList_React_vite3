import React, { useState, useContext } from "react";
import styles from "../styles/modules/storageBody.module.css";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";
import { appDataContext } from "../context/DataContext";
import AddNoteForm from "./AddNoteForm";
import AddFileForm from "./AddFileForm";
import File from "./File";
import Masonry from "@mui/lab/Masonry";

function storagebody({ notes, title, setShowFile, id, files }) {
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
      <div className={styles.storageBodyNoteGrid}>
        <Masonry
          columns={4}
          spacing={2} /* className={styles.storageBodyGrid} */
        >
          {notes.length > 0 &&
            notes.map((noteObject) => (
              <div key={noteObject.id} className={styles.note}>
                <div className={styles.noteTitleDiv}>
                  <h2>{noteObject.title}</h2>
                  <button
                    type="button"
                    onClick={() => handleDeleteNote(noteObject.id, id)}
                  >
                    <CgClose />
                  </button>
                </div>
                <p>{noteObject.body}</p>
              </div>
            ))}
        </Masonry>
      </div>

      <div className={styles.storageBodyFileGrid}>
        <h1>Folder Storage:</h1>
        {files.length > 0 ? (
          files.map((fileObject) => (
            <div key={fileObject.id} className={styles.file}>
              <File
                fileTitle={fileObject.title}
                fileName={fileObject.name}
                storageTitle={title}
                storageId={id}
                fileId={fileObject.id}
                embedClass={styles.embedFile}
                embedGridClass={styles.embedGrid}
              />
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>Empty</p>
        )}
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
