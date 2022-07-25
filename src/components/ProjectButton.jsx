import React from "react";

function ProjectButton(props) {
  const projectLength = props.projectFilter(props.projectName).length;

  return (
    <button
      type="button"
      style={{
        fontWeight: props.requireTab(props.projectName) ? "bolder" : "normal",
      }}
      onClick={() => {
        props.updateRef(props.projectName);
        props.handleIsTabOpen(props.projectName);
        props.setProjectFilterName(props.projectName);
        props.setIsProject(true);
      }}
    >
      {props.requireTab(props.projectName) ? (
        <span className="project-span">
          <p>// {props.projectName}</p>
        </span>
      ) : (
        <span className="project-span">
          <p>{props.projectName}</p>
        </span>
      )}

      {projectLength > 0 && <p className="number">{projectLength}</p>}
    </button>
  );
}

export default ProjectButton;
