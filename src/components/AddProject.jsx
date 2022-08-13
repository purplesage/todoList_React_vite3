import React, { useContext } from "react";
import { projectListContext } from "../context/ProjectListContext";
import { tabHandlingContext } from "../context/TabHandlingContext";
import { utilityContext } from "../context/UtilityContext";
import styles from "../styles/modules/addProject.module.css";

function AddProject({ setIsOpen, setIsProject }) {
  const {
    handleAddProject,
    projectInput,
    setProjectInput,
    setProjectFilterName,
    updateRef,
    inputRef,
  } = useContext(projectListContext);

  const { handleAddProjectTab, handleOpenTab } = useContext(tabHandlingContext);

  const { setIsMobileNav, handleNotificationAnimation } =
    useContext(utilityContext);

  return (
    <div className={styles.addProjectSection}>
      <form
        className={styles.addProjectForm}
        action="add-project"
        onSubmit={(e) => {
          e.preventDefault();
          updateRef(projectInput);
          handleAddProject(inputRef.current);
          handleOpenTab(inputRef.current);
          handleAddProjectTab(inputRef.current);
          setProjectFilterName(inputRef.current);
          setIsProject(true);
          setIsOpen(false);
          setProjectInput("");
          setIsMobileNav(false);
          handleNotificationAnimation();
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
