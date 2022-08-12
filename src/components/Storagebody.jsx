import React, { useState } from "react";
import styles from "../styles/modules/storageBody.module.css";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";
import { AiFillFileAdd } from "react-icons/ai";
import { MdStorage } from "react-icons/md";
import AddNoteForm from "./AddNoteForm";
import AddFileForm from "./AddFileForm";
import Masonry from "@mui/lab/Masonry";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { AiFillFolder } from "react-icons/ai";
import NoteList from "./NoteList";
import FileList from "./FileList";

function storagebody({ notes, storageTitle, setShowFile, storageID, files }) {
  const [showNoteInputs, setShowNoteInputs] = useState(false);
  const [showFileInputs, setShowFileInputs] = useState(false);

  const [displayStorageFiles, setDisplayStorageFiles] = useState(false);

  return ReactDOM.createPortal(
    <main className={styles.storageGrid}>
      <h1>
        <p className={styles.folderTitle}>
          <AiFillFolder />
          {storageTitle}
        </p>
        <button
          type="button"
          onClick={() => {
            setShowFile(false);
          }}
        >
          <CgClose />
        </button>
      </h1>
      <section className={styles.storageBodyNoteGrid}>
        <Masonry columns={{ xs: 2, sm: 4 }} spacing={2}>
          <NoteList notes={notes} storageID={storageID} />
        </Masonry>
      </section>

      {/* buttons that toggle form display */}

      <button
        className={styles.openFileStorage}
        type="button"
        onClick={() => setDisplayStorageFiles(true)}
      >
        <MdStorage />
      </button>

      <button
        className={styles.openAddNoteForm}
        type="button"
        onClick={() => setShowNoteInputs(true)}
      >
        <MdOutlineStickyNote2 />
      </button>

      {showNoteInputs && (
        <AddNoteForm
          storageID={storageID}
          setShowNoteInputs={setShowNoteInputs}
        />
      )}

      {displayStorageFiles && (
        <section className={styles.storageBodyFileGrid}>
          <h1>
            Folder Storage:{" "}
            <button type="button" onClick={() => setDisplayStorageFiles(false)}>
              <CgClose />
            </button>
          </h1>

          <div className={styles.storageBodyFileFlex}>
            <FileList
              files={files}
              storageTitle={storageTitle}
              storageID={storageID}
            />
            {!showFileInputs ? (
              <button
                className={styles.addFileButton}
                type="button"
                onClick={() => setShowFileInputs(true)}
              >
                <AiFillFileAdd />
              </button>
            ) : (
              <AddFileForm
                setShowFileInputs={setShowFileInputs}
                storageTitle={storageTitle}
                storageID={storageID}
              />
            )}
          </div>
        </section>
      )}
    </main>,
    document.getElementById("portal")
  );
}

export default storagebody;
