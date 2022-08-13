import React, { createContext, useState, useRef } from "react";

export const projectListContext = createContext({});

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
        inputRef,
      }}
    >
      {children}
    </projectListContext.Provider>
  );
}

export default ProjectListContext;
