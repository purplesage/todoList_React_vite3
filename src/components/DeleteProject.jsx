import React, { useContext } from "react";
import { makeTodoContext } from "../context/DataContext";

function DeleteProject({ projectName, setIsProject }) {
  const { handleDeleteProject, projectList, handleIsTabOpen } =
    useContext(makeTodoContext);

  const findProjectId = () => {
    const projectObject = projectList.find(
      (project) => project.value === projectName
    );

    const id = projectObject.id || null;

    return id;
  };
  return (
    <div className="delete-project-div">
      <h1>Empty project!</h1>
      <p>Create a new to-do item or delete project.</p>
      <button
        onClick={() => {
          setIsProject(false);
          handleDeleteProject(findProjectId());
          handleIsTabOpen("home21133");
        }}
      >
        DELETE PROJECT
      </button>
    </div>
  );
}

export default DeleteProject;
