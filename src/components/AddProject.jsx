import React, { useContext } from "react";
import { makeTodoContext } from "../context/DataContext";
import styles from "../styles/modules/addProject.module.css";

function AddProject({ setIsOpen, setIsProject }) {
  const {
    handleAddProject,
    projectInput,
    setProjectInput,
    setProjectFilterName,
    updateRef,
    inputRef,
    handleAddProjectTab,
    handleIsTabOpen,
  } = useContext(makeTodoContext);

  return (
    <div className={styles.addProjectSection}>
      <form
        className={styles.addProjectForm}
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
