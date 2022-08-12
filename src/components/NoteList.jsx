import React from "react";
import Note from "./Note";

function NoteList({ notes, storageID }) {
  return (
    <>
      {notes.length > 0 &&
        notes.map((noteObject) => (
          <Note
            key={noteObject.id}
            noteId={noteObject.id}
            noteTitle={noteObject.title}
            storageID={storageID}
            noteBody={noteObject.body}
          />
        ))}
    </>
  );
}

// {notes.length > 0 &&
//   notes.map((noteObject) => (
//     <Note
//       key={noteObject.id}
//       noteId={noteObject.id}
//       noteTitle={noteObject.title}
//       id={id}
//       noteBody={noteObject.body}
//       handleDeleteNote={handleDeleteNote}
//     />
//   ))}

export default NoteList;
