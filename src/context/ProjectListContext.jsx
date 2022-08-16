import React, { createContext, useState } from "react";

import { v4 as uuid } from "uuid";

export const projectListContext = createContext({});

function ProjectListContext({ children }) {
  //* project state logic----------------
  const [projectList, setProjectList] = useState([]);
  const [projectInput, setProjectInput] = useState("");
  const [projectFilterName, setProjectFilterName] = useState("");

  const handleAddProject = (value) => {
    const duplicateCheck = projectList.find(
      (project) => project.value.toLowerCase() === value.toLowerCase()
    );

    if (!duplicateCheck) {
      const projectObject = { value, id: uuid() };
      setProjectList([...projectList, projectObject]);
    }
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
        handleAddProject,
        handleDeleteProject,
        setProjectList,
      }}
    >
      {children}
    </projectListContext.Provider>
  );
}

export default ProjectListContext;
