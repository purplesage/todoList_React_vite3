import React, { createContext, useState, useReducer, useEffect } from "react";
import { dataBase, storage } from "../util/firebaseConfig";

import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  list,
} from "firebase/storage";

const folderListContext = createContext({});

function FolderListContext({ children }) {
  //*  folderList reducer logic----------------------------
  const [folderTitleInput, setfolderTitleInput] = useState("");
  const [folderFileInput, setfolderFileInput] = useState("");

  //* file uploading state
  const [isUploading, setIsUploading] = useState(false);

  const foldersReducer = (state, action) => {
    switch (action.type) {
      case "add_folder": {
        return [...state, action.newfolder];
      }

      case "delete_folder": {
        return state.filter((folderObject) => folderObject.id !== action.id);
      }

      case "load_folderList": {
        return [...action.folderList];
      }

      case "add_note": {
        return state.map((folderObject) =>
          folderObject.id === action.id
            ? {
                ...folderObject,
                notes: [...folderObject.notes, action.newNote],
              }
            : folderObject
        );
      }

      case "delete_note": {
        return state.map((folderObject) =>
          folderObject.id === action.folderID
            ? {
                ...folderObject,
                notes: folderObject.notes.filter(
                  (note) => note.id !== action.noteID
                ),
              }
            : folderObject
        );
      }

      case "add_file": {
        return state.map((folderObject) =>
          folderObject.id === action.id
            ? {
                ...folderObject,
                files: [...folderObject.files, action.newFile],
              }
            : folderObject
        );
      }

      case "delete_file": {
        return state.map((folderObject) =>
          folderObject.id === action.folderID
            ? {
                ...folderObject,
                files: folderObject.files.filter(
                  (file) => file.id !== action.fileID
                ),
              }
            : folderObject
        );
      }
    }
  };

  const [folderList, foldersDispatcher] = useReducer(foldersReducer, []);

  //* state related functions------------------------------------
  const handleAddFile = (id, newFile) => {
    foldersDispatcher({ type: "add_file", id, newFile });
  };

  const handleDeleteFile = (fileID, folderID) => {
    foldersDispatcher({ type: "delete_file", fileID, folderID });
  };
  const handleAddNote = (id, newNote) => {
    foldersDispatcher({ type: "add_note", id, newNote });
  };

  const handleDeleteNote = (noteID, folderID) => {
    foldersDispatcher({ type: "delete_note", noteID, folderID });
  };

  const handleAddFolder = (newfolder) => {
    const findDuplicate = folderList.find(
      (folderObject) => folderObject.title === newfolder.title
    );

    if (findDuplicate) return;
    foldersDispatcher({ type: "add_folder", newfolder });
  };

  const handleDeletefolder = (id) => {
    foldersDispatcher({ type: "delete_folder", id });
  };

  const handleLoadfolderList = (folderList) => {
    foldersDispatcher({ type: "load_folderList", folderList });
  };

  //* firebase related functions---------------------------------

  const fileRef = (folderTitle, fileName) => {
    const fileRef = ref(
      storage,
      `users/${userEmail}_files/${folderTitle}/${fileName}`
    );
    return fileRef;
  };

  const uploadToStorage = async (
    fileObject,
    folderTitle,
    addFileToList,
    setShowFileInputs
  ) => {
    setIsUploading(true);
    try {
      if (!fileObject) return;

      const ref = fileRef(folderTitle, fileObject.name);

      const onCompleted = () => {
        setIsUploading(false), addFileToList(), setShowFileInputs(false);
      };

      await uploadBytesResumable(ref, fileObject.file).then(onCompleted);
    } catch (err) {
      console.warn(err.message);
    }
  };

  const deleteFolderFromStorage = async (folderTitle) => {
    const file_ref = ref(storage, `users/${userEmail}_files/${folderTitle}`);
    const file_list = await list(file_ref);

    file_list.items.forEach(async (referenceObject) => {
      const innerFileRef = ref(storage, referenceObject.fullPath);
      await deleteObject(innerFileRef);
    });
  };

  const fetchFile = async (folderTitle, fileName, setUrlState) => {
    const file_ref = fileRef(folderTitle, fileName);

    const fetchFileUrl = await getDownloadURL(file_ref);
    setUrlState(fetchFileUrl);
  };

  const deleteFileFromStorage = async (folderTitle, fileName) => {
    const file_ref = fileRef(folderTitle, fileName);

    await deleteObject(file_ref);
  };

  //* update folderList in firebase on state change

  useEffect(() => {
    const updatefolderList = async () => {
      const docRef = doc(dataBase, `users/${userEmail}`);
      await updateDoc(docRef, { folderList });
    };

    if (!isLoading) {
      updatefolderList();
    }
  }, [folderList]);

  return (
    <folderListContext.Provider
      value={{
        folderTitleInput,
        setfolderTitleInput,
        folderFileInput,
        setfolderFileInput,
        folderList,
        handleAddFile,
        handleDeleteFile,
        handleAddNote,
        handleDeleteNote,
        handleAddFolder,
        handleDeletefolder,
        uploadToStorage,
        deleteFolderFromStorage,
        fetchFile,
        deleteFileFromStorage,
        isUploading,
      }}
    >
      {children}
    </folderListContext.Provider>
  );
}

export default FolderListContext;
