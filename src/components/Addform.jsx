import React, { useContext, useState } from "react";
import { inputContext } from "../context/InputHandling";
import AddTodo from "./AddTodo";
import AddProject from "./AddProject";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";
import styles from "../styles/modules/addForm.module.css";
import AddFolder from "./AddFolder";

function Addform({ setIsOpen, isProject, setIsProject }) {
  //swtich handlers
  const [isCreateTodo, setIsCreateTodo] = useState(true);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isCreatefolder, setIsCreatefolder] = useState(false);

  const { resetInputs } = useContext(inputContext);

  return ReactDOM.createPortal(
    <div className="dark-overlay">
      <div className={styles.addDiv}>
        <header className={styles.createHeader}>
          Create a new...
          <CgClose
            type="button"
            className={styles.close}
            onClick={() => {
              setIsOpen(false);
              resetInputs();
            }}
          />
        </header>
        <nav className={styles.createSelection}>
          <button
            style={isCreateTodo ? { fontWeight: "bolder" } : null}
            type="button"
            onClick={() => {
              setIsCreateProject(false);
              setIsCreatefolder(false);
              setIsCreateTodo(true);
            }}
          >
            {isCreateTodo ? <p>// To Do</p> : <p>To Do</p>}
          </button>
          <button
            style={isCreateProject ? { fontWeight: "bolder" } : null}
            type="button"
            onClick={() => {
              setIsCreateTodo(false);
              setIsCreatefolder(false);
              setIsCreateProject(true);
            }}
          >
            {isCreateProject ? <p>//Project</p> : <p>Project</p>}
          </button>
          <button
            style={isCreatefolder ? { fontWeight: "bolder" } : null}
            type="button"
            onClick={() => {
              setIsCreateProject(false);
              setIsCreateTodo(false);
              setIsCreatefolder(true);
            }}
          >
            {isCreatefolder ? <p>// Folder</p> : <p>Folder</p>}
          </button>
        </nav>

        <div className={styles.createDisplay}>
          {isCreateTodo && (
            <AddTodo
              resetInputs={resetInputs}
              setIsOpen={setIsOpen}
              isProject={isProject}
            />
          )}
          {isCreateProject && (
            <AddProject setIsOpen={setIsOpen} setIsProject={setIsProject} />
          )}

          {isCreatefolder && (
            <AddFolder setIsOpen={setIsOpen} setIsProject={setIsProject} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Addform;
