import React, { useContext, useState } from "react";
import { inputContext } from "../context/InputHandling";
import AddTodo from "./AddTodo";
import AddProject from "./AddProject";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";
import styles from "../styles/modules/addForm.module.css";
import Addstorage from "./Addstorage";

function Addform({ setIsOpen, isProject, setIsProject }) {
  //swtich handlers
  const [isCreateTodo, setIsCreateTodo] = useState(true);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isCreatestorage, setIsCreatestorage] = useState(false);

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
          >
            {" "}
            close
          </CgClose>
        </header>
        <nav className={styles.createSelection}>
          <button
            style={isCreateTodo ? { fontWeight: "bolder" } : null}
            type="button"
            onClick={() => {
              setIsCreateProject(false);
              setIsCreatestorage(false);
              setIsCreateTodo(true);
            }}
          >
            {isCreateTodo && <p>//</p>}
            To Do
          </button>
          <button
            style={isCreateProject ? { fontWeight: "bolder" } : null}
            type="button"
            onClick={() => {
              setIsCreateTodo(false);
              setIsCreatestorage(false);
              setIsCreateProject(true);
            }}
          >
            {isCreateProject && <p>//</p>}
            Project
          </button>
          <button
            style={isCreatestorage ? { fontWeight: "bolder" } : null}
            type="button"
            onClick={() => {
              setIsCreateProject(false);
              setIsCreateTodo(false);
              setIsCreatestorage(true);
            }}
          >
            {isCreatestorage && <p>//</p>}
            Storage
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

          {isCreatestorage && (
            <Addstorage setIsOpen={setIsOpen} isProject={isProject} />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Addform;
