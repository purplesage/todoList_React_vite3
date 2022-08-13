import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useRef,
} from "react";
import format from "date-fns/format";
import isThisWeek from "date-fns/esm/isThisWeek/index";
import parseISO from "date-fns/esm/fp/parseISO/index";
import { v4 as uuid } from "uuid";
import { dataBase, storage } from "../util/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  list,
} from "firebase/storage";

export const appDataContext = createContext({});

//* TODO state logic
export default function DataContext({ children, userEmail }) {
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "add_todo": {
        return [...state, action.todoObject];
      }

      case "delete_todo": {
        return state.filter((todoObject) => todoObject.id !== action.id);
      }

      case "edit_todo": {
        return state.map((todoObject) =>
          todoObject.id === action.todoObject.id
            ? { ...action.todoObject, project: todoObject.project || "" }
            : todoObject
        );
      }

      case "handle_done_todo": {
        return state.map((todoObject) =>
          todoObject.id === action.id
            ? { ...todoObject, done: !todoObject.done }
            : todoObject
        );
      }

      case "load_todos": {
        return [...action.list];
      }
    }
    throw Error(`Unknown action: ${action.type}`);
  };

  const [todoList, dispatcher] = useReducer(todoListReducer, []);

  const handleAddTodo = (todoObject, isProject) => {
    if (!isProject) {
      dispatcher({ type: "add_todo", todoObject });
      return;
    }
    const projectTodo = { ...todoObject, project: inputRef.current };
    dispatcher({ type: "add_todo", todoObject: projectTodo });
  };

  const handleLoadTodos = (todos) => {
    dispatcher({ type: "load_todos", list: todos });
  };

  const handleTodoDelete = (id) => {
    dispatcher({ type: "delete_todo", id });
  };

  const handleEditTodo = (todoObject) => {
    dispatcher({ type: "edit_todo", todoObject });
  };

  const handleIsDone = (id) => {
    dispatcher({ type: "handle_done_todo", id });
  };

  const todayFilter = (() => {
    const today = format(new Date(), "Y-MM-dd");
    return todoList.filter((todoObj) => todoObj.dueDate === today);
  })();

  const thisWeekFilter = todoList.filter(
    (todoObj) => isThisWeek(new Date(parseISO(todoObj.dueDate))) === true
  );

  //* project state logic----------------
  const [projectList, setProjectList] = useState([]);
  const [projectInput, setProjectInput] = useState("");
  const [projectFilterName, setProjectFilterName] = useState("");

  //*ref used to avoid bugs when manipulating projectInput state.
  const inputRef = useRef("");

  const updateRef = (input) => {
    inputRef.current = input;
  };

  const handleAddProject = (value) => {
    const duplicateCheck = projectList.find(
      (project) => project.value.toLowerCase() === value.toLowerCase()
    );

    if (!duplicateCheck) {
      const projectObject = { value, id: uuid() };
      setProjectList([...projectList, projectObject]);
    }
  };

  const projectFilter = (projectName) => {
    return todoList.filter((todoObject) => todoObject.project === projectName);
  };

  const handleDeleteProject = (id) => {
    setProjectList(projectList.filter((project) => project.id !== id));
  };

  //* folderS state logic-----------------------------
  const [folderTitleInput, setfolderTitleInput] = useState("");
  const [folderFileInput, setfolderFileInput] = useState("");

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

  const handleAddFile = (id, newFile) => {
    foldersDispatcher({ type: "add_file", id, newFile });
  };

  const handleDeleteFile = (fileID, folderID) => {
    foldersDispatcher({ type: "delete_file", fileID, folderID });
  };

  //* fetch folder files links on user authentication test.
  const [isUploading, setIsUploading] = useState(false);

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

  const fetchFile = async (folderTitle, fileTitle, fileName, setUrlState) => {
    const file_ref = fileRef(folderTitle, fileTitle, fileName);

    const fetchFileUrl = await getDownloadURL(file_ref);
    setUrlState(fetchFileUrl);
  };

  const deleteFileFromStorage = async (folderTitle, fileTitle, fileName) => {
    const file_ref = fileRef(folderTitle, fileTitle, fileName);

    await deleteObject(file_ref);
  };

  const handleDeleteNote = (noteID, folderID) => {
    foldersDispatcher({ type: "delete_note", noteID, folderID });
  };

  const handleAddNote = (id, newNote) => {
    foldersDispatcher({ type: "add_note", id, newNote });
  };

  const handleLoadfolderList = (folderList) => {
    foldersDispatcher({ type: "load_folderList", folderList });
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

  const [folderList, foldersDispatcher] = useReducer(foldersReducer, []);

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

  //* tab styling logic-------------------------
  function tabReducer(state, action) {
    switch (action.type) {
      case "set_is_open": {
        return state.map((tabObject) =>
          tabObject.name === action.tabName
            ? { ...tabObject, state: true }
            : { ...tabObject, state: false }
        );
      }

      case "add_project_tab": {
        return [...state, action.projectTab];
      }
    }
  }

  function handleOpenTab(tabName) {
    tabDispatcher({
      type: "set_is_open",
      tabName,
    });
  }

  function handleAddProjectTab(projectName, onLoad) {
    tabDispatcher({
      type: "add_project_tab",
      projectTab: { name: projectName, state: onLoad ? false : true },
    });
  }

  const [tabList, tabDispatcher] = useReducer(tabReducer, [
    { name: "home21133", state: true },
    { name: "today21133", state: false },
    { name: "week21133", state: false },
    { name: "folders21133", state: false },
  ]);

  function requireTabState(tabName) {
    const tab = tabList.find((tabObject) => tabObject.name === tabName);
    if (tab) {
      const state = tab.state;
      return state;
    }
  }

  //* content availability state.
  const [error, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isMobileNav, setIsMobileNav] = useState(false);
  const [notificationDisplay, setNotificationDisplay] = useState(false);

  const handleNotificationAnimation = () => {
    setNotificationDisplay(true);

    setTimeout(() => {
      setNotificationDisplay(false);
    }, 4500);
  };

  //! fetch todoList and projectList on auth state change (see in App.jsx):
  useEffect(() => {
    if (userEmail) {
      handleOpenTab("home21133");
      const searchOrCreateUserDocument = async () => {
        try {
          const docRef = doc(dataBase, `users/${userEmail}`);
          const checkDocExistence = await getDoc(docRef);

          if (checkDocExistence.exists()) {
            const docInfo = checkDocExistence.data();
            handleLoadTodos(docInfo.todoList);
            setProjectList(docInfo.projectList);
            handleLoadfolderList(docInfo.folderList);
            docInfo.projectList.forEach((projectObject) => {
              handleAddProjectTab(projectObject.value, true);
            });
          } else {
            await setDoc(docRef, {
              todoList: [],
              projectList: [],
              folderList: [],
            });
          }
          setIsLoading(false);
        } catch (err) {
          setIsError(true);
          console.error(err.message);
        }
      };

      searchOrCreateUserDocument();
    }
  }, [userEmail]);

  //* update firestore todoList on state change.
  useEffect(() => {
    const updateTodoList = async () => {
      const docRef = doc(dataBase, `users/${userEmail}`);
      await updateDoc(docRef, { todoList });
    };

    if (!isLoading) {
      updateTodoList();
    }
  }, [todoList]);

  //* update firestore projectList on state change.
  useEffect(() => {
    const updateTodoList = async () => {
      const docRef = doc(dataBase, `users/${userEmail}`);
      await updateDoc(docRef, { projectList });
    };

    if (!isLoading) {
      updateTodoList();
    }
  }, [projectList]);

  return (
    <appDataContext.Provider
      value={{
        todoList,
        handleAddTodo,
        handleTodoDelete,
        handleEditTodo,
        todayFilter,
        thisWeekFilter,
        handleAddProject,
        projectList,
        projectInput,
        setProjectInput,
        projectFilter,
        handleDeleteProject,
        projectFilterName,
        setProjectFilterName,
        handleIsDone,
        handleOpenTab,
        handleAddProjectTab,
        requireTabState,
        error,
        updateRef,
        inputRef,
        isLoading,
        isMobileNav,
        setIsMobileNav,
        notificationDisplay,
        handleNotificationAnimation,
        folderList,
        handleAddFolder,
        folderTitleInput,
        setfolderTitleInput,
        folderFileInput,
        setfolderFileInput,
        handleDeletefolder,
        handleAddNote,
        handleDeleteNote,
        uploadToStorage,
        handleAddFile,
        fetchFile,
        handleDeleteFile,
        deleteFileFromStorage,
        isUploading,
        deleteFolderFromStorage,
      }}
    >
      {children}
    </appDataContext.Provider>
  );
}
