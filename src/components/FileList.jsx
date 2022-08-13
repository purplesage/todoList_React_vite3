import React from "react";
import File from "./File";

function FileList({ files, folderID, folderTitle }) {
  return (
    <>
      {files.length > 0 &&
        files.map((fileObject) => (
          <File
            key={fileObject.id}
            fileTitle={fileObject.title}
            fileName={fileObject.name}
            folderTitle={folderTitle}
            folderID={folderID}
            fileId={fileObject.id}
          />
        ))}
    </>
  );
}

export default FileList;
