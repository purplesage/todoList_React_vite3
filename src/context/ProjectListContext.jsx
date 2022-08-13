import React, { createContext, useState, useRef, useEffect } from "react";

import { doc, updateDoc } from "firebase/firestore";

const projectListContext = createContext({});

function ProjectListContext({ children }) {
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
    <projectListContext.Provider
      value={{
        projectList,
        projectInput,
        setProjectInput,
        projectFilterName,
        setProjectFilterName,
        updateRef,
        handleAddProject,
        projectFilter,
        handleDeleteProject,
      }}
    >
      {children}
    </projectListContext.Provider>
  );
}

export default ProjectListContext;
