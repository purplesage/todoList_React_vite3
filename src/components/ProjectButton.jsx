import React, { useContext } from "react";
import { tabHandlingContext } from "../context/TabHandlingContext";
import { projectListContext } from "../context/ProjectListContext";
import { todoListContext } from "../context/TodoListContext";
import styles from "../styles/modules/projectButton.module.css";

function ProjectButton({ setIsProject, projectName, listLength }) {
  const { handleOpenTab, requireTabState } = useContext(tabHandlingContext);

  const { setProjectFilterName } = useContext(projectListContext);

  const { projectFilter, updateRef } = useContext(todoListContext);

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
