import React, { useState, useContext, useEffect } from "react";
import InputHandling from "../../context/InputHandling";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Display from "./display/Display";
import Addform from "../../components/Addform";
import styles from "../../styles/modules/todoApp.module.css";
import { tabHandlingContext } from "../../context/TabHandlingContext";
import { todoListContext } from "../../context/TodoListContext";
import { projectListContext } from "../../context/ProjectListContext";
import { folderListContext } from "../../context/FolderListContext";
import { utilityContext } from "../../context/UtilityContext";
import { dataBase } from "../../util/firebaseConfig";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function TodoApp({ userEmail }) {
  //add form conditional openning state
  const [isOpen, setIsOpen] = useState(false);

  //currently in a project tab check
  const [isProject, setIsProject] = useState(false);

  //*context functions used in useEffect hooks----------------------------

  const { handleOpenTab, handleAddProjectTab } = useContext(tabHandlingContext);
  const { handleLoadTodos, todoList } = useContext(todoListContext);
  const { setProjectList, projectList } = useContext(projectListContext);
  const { handleLoadfolderList, folderList } = useContext(folderListContext);
  const { setIsLoading, setIsError, isLoading } = useContext(utilityContext);

  //* fetch todoList and projectList on auth state change (see in App.jsx):
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
    const updateProjectList = async () => {
      const docRef = doc(dataBase, `users/${userEmail}`);
      await updateDoc(docRef, { projectList });
    };

    if (!isLoading) {
      updateProjectList();
    }
  }, [projectList]);

  //* update folderList in firebase on state change
  useEffect(() => {
    const updateFolderList = async () => {
      const docRef = doc(dataBase, `users/${userEmail}`);
      await updateDoc(docRef, { folderList });
    };

    if (!isLoading) {
      updateFolderList();
    }
  }, [folderList]);

  return (
    <main className={styles.todoSection}>
      <Header />
      <Nav setIsOpen={setIsOpen} isOpen={isOpen} setIsProject={setIsProject} />
      <InputHandling>
        <Display isProject={isProject} setIsProject={setIsProject} />
        {isOpen && (
          <Addform
            setIsOpen={setIsOpen}
            isProject={isProject}
            setIsProject={setIsProject}
          />
        )}
      </InputHandling>
    </main>
  );
}

export default TodoApp;
