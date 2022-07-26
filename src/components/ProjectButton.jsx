import React, { useContext } from "react";
import { makeTodoContext } from "../context/DataContext";

function ProjectButton({ setIsProject, projectName }) {
  const {
    setProjectFilterName,
    projectFilter,
    updateRef,
    handleIsTabOpen,
    requireTab,
  } = useContext(makeTodoContext);

  const projectLength = projectFilter(projectName).length;
  return (
    <button
      type="button"
      style={{
        fontWeight: requireTab(projectName) ? "bolder" : "normal",
      }}
      onClick={() => {
        updateRef(projectName);
        handleIsTabOpen(projectName);
        setProjectFilterName(projectName);
        setIsProject(true);
      }}
    >
      {requireTab(projectName) ? (
        <span className="project-span">
          <p>// {projectName}</p>
        </span>
      ) : (
        <span className="project-span">
          <p>{projectName}</p>
        </span>
      )}

      {projectLength > 0 && <p className="number">{projectLength}</p>}
    </button>
  );
}

export default ProjectButton;
