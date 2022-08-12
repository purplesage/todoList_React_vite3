import React, { useState } from "react";
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
  const [modalStyle, setModalStyle] = useState(false);

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
      className={noteCLS}
    >
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
