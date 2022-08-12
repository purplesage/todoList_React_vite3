import React from "react";
import File from "./File";

function FileList({ files, storageID, storageTitle }) {
  return (
    <>
      {files.length > 0 &&
        files.map((fileObject) => (
          <File
            key={fileObject.id}
            fileTitle={fileObject.title}
            fileName={fileObject.name}
            storageTitle={storageTitle}
            storageID={storageID}
            fileId={fileObject.id}
          />
        ))}
    </>
  );
}

// {files.length > 0 &&
//   files.map((fileObject) => (
//     <File
//       key={fileObject.id}
//       fileTitle={fileObject.title}
//       fileName={fileObject.name}
//       storageTitle={title}
//       storageId={id}
//       fileId={fileObject.id}
//     />
//   ))}

export default FileList;
