import React, { useContext } from "react";
import { projectListContext } from "../context/ProjectListContext";
import { tabHandlingContext } from "../context/TabHandlingContext";
import styles from "../styles/modules/deleteProject.module.css";

function DeleteProject({ projectName, setIsProject }) {
  const { handleDeleteProject, projectList } = useContext(projectListContext);

  const { handleOpenTab } = useContext(tabHandlingContext);

  const findProjectId = () => {
    const projectObject = projectList.find(
      (project) => project.value === projectName
    );

    const id = projectObject.id || null;

    return id;
  };
  return (
    <div className={styles.deleteProjectDiv}>
      <h1>Empty project!</h1>
      <p>Create a new to-do item or delete project.</p>
      <button
        onClick={() => {
          setIsProject(false);
          handleDeleteProject(findProjectId());
          handleOpenTab("home21133");
        }}
      >
        DELETE PROJECT
      </button>
    </div>
  );
}

export default DeleteProject;
