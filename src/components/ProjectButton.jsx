import React, { useContext } from "react";
import { appDataContext } from "../context/DataContext";
import styles from "../styles/modules/projectButton.module.css";

function ProjectButton({ setIsProject, projectName, listLength }) {
  const {
    setProjectFilterName,
    projectFilter,
    updateRef,
    handleOpenTab,
    requireTabState,
  } = useContext(appDataContext);

  const projectLength = listLength(projectFilter(projectName));

  return (
    <button
      type="button"
      style={{
        fontWeight: requireTabState(projectName) ? "bolder" : "normal",
      }}
      onClick={() => {
        updateRef(projectName);
        handleOpenTab(projectName);
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
