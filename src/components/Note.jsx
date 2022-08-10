import React from "react";
import { CgClose } from "react-icons/cg";

function Note({
  noteId,
  noteCLS,
  noteTitleDivCLS,
  noteTitle,
  id,
  noteBody,
  handleDeleteNote,
}) {
  return (
    <div className={noteCLS}>
      <div className={noteTitleDivCLS}>
        <h2>{noteTitle}</h2>
        <button type="button" onClick={() => handleDeleteNote(noteId, id)}>
          <CgClose />
        </button>
      </div>
      <p>{noteBody}</p>
    </div>
  );
}

export default Note;
