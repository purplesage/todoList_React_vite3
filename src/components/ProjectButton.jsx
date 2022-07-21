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
      {props.requireTab(props.projectName) && <p>//</p>}
      {props.projectName}

      {projectLength > 0 && <p className="number">{projectLength}</p>}
    </button>
  );
}

export default ProjectButton;
