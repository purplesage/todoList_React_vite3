import React, { useState } from "react";
import InputHandling from "../../context/InputHandling";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Display from "./display/Display";
import Addform from "../../components/Addform";
import styles from "../../styles/modules/todoApp.module.css";

function TodoApp() {
  //add form conditional openning state
  const [isOpen, setIsOpen] = useState(false);

  //currently in a project tab check
  const [isProject, setIsProject] = useState(false);

  //!---------------------------------------------------
  // useEffect(() => {
  //   if (userEmail) {
  //     handleOpenTab("home21133");
  //     const searchOrCreateUserDocument = async () => {
  //       try {
  //         const docRef = doc(dataBase, `users/${userEmail}`);
  //         const checkDocExistence = await getDoc(docRef);

  //         if (checkDocExistence.exists()) {
  //           const docInfo = checkDocExistence.data();
  //           handleLoadTodos(docInfo.todoList);
  //           setProjectList(docInfo.projectList);
  //           handleLoadfolderList(docInfo.folderList);
  //           docInfo.projectList.forEach((projectObject) => {
  //             handleAddProjectTab(projectObject.value, true);
  //           });
  //         } else {
  //           await setDoc(docRef, {
  //             todoList: [],
  //             projectList: [],
  //             folderList: [],
  //           });
  //         }
  //         setIsLoading(false);
  //       } catch (err) {
  //         setIsError(true);
  //         console.error(err.message);
  //       }
  //     };

  //     searchOrCreateUserDocument();
  //   }
  // }, [userEmail]);
  //!---------------------------------------------------

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
