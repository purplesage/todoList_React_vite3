import React, { useContext } from "react";
import { makeTodoContext } from "../context/DataContext";
import styles from "../styles/modules/projectButton.module.css";

function ProjectButton({ setIsProject, projectName }) {
  const {
    setProjectFilterName,
    projectFilter,
    updateRef,
    handleIsTabOpen,
    requireTabState,
  } = useContext(makeTodoContext);

  const projectLength = projectFilter(projectName).length;
  return (
    <button
      type="button"
      style={{
        fontWeight: requireTabState(projectName) ? "bolder" : "normal",
      }}
      onClick={() => {
        updateRef(projectName);
        handleIsTabOpen(projectName);
        setProjectFilterName(projectName);
        setIsProject(true);
      }}
    >
      {requireTabState(projectName) ? (
        <span className={styles.projectSpan}>
          <p>// {projectName}</p>
        </span>
      ) : (
        <span className={styles.projectSpan}>
          <p>{projectName}</p>
        </span>
      )}

      {projectLength > 0 && <p className={styles.number}>{projectLength}</p>}
    </button>
  );
}

export default ProjectButton;
