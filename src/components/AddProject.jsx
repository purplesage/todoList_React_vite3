import React from "react";

function AddProject({
  handleAddProject,
  setIsOpen,
  projectInput,
  setProjectInput,
  setIsProject,
  handleAddProjectTab,
  handleIsTabOpen,
  setProjectFilterName,
  updateRef,
  inputRef,
}) {
  return (
    <div className="add-project-section">
      <form
        className="add-project-form"
        action="add-project"
        onSubmit={(e) => {
          e.preventDefault();
          updateRef(projectInput);
          handleAddProject(inputRef.current);
          handleIsTabOpen(inputRef.current);
          handleAddProjectTab(inputRef.current);
          setProjectFilterName(inputRef.current);
          setIsProject(true);
          setIsOpen(false);
          setProjectInput("");
        }}
      >
        <input
          required
          autoComplete="off"
          maxLength="15"
          placeholder="Project Title:"
          type="text"
          name="project-title"
          id="project-title"
          value={projectInput}
          onChange={(e) => setProjectInput(e.target.value)}
        />

        <button type="submit">CREATE PROJECT</button>
      </form>
    </div>
  );
}

export default AddProject;
