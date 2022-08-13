import React from "react";
import Note from "./Note";

function NoteList({ notes, folderID }) {
  return (
    <>
      {notes.length > 0 &&
        notes.map((noteObject) => (
          <Note
            key={noteObject.id}
            noteId={noteObject.id}
            noteTitle={noteObject.title}
            folderID={folderID}
            noteBody={noteObject.body}
          />
        ))}
    </>
  );
}

export default NoteList;
