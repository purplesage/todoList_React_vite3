import React from "react";

function DeleteProject({
  projectName,
  handleDeleteProject,
  setIsProject,
  handleIsTabOpen,
  projectList,
}) {
  const findProjectId = () => {
    const projectObject = projectList.find(
      (project) => project.value === projectName
    );

    const id = projectObject.id || null;

    return id;
  };
  return (
    <div>
      <h1>Empty project!</h1>
      <p>Create a new to-do item or delete project.</p>
      <button
        onClick={() => {
          setIsProject(false);
          handleDeleteProject(projectName, findProjectId());
          handleIsTabOpen("home21133");
        }}
      >
        Delete Project
      </button>
    </div>
  );
}

export default DeleteProject;
