import React, { useContext, useState } from "react";
import { inputContext } from "../context/InputHandling";
import AddTodo from "./AddTodo";
import AddProject from "./AddProject";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";

function Addform({ setIsOpen, isProject, setIsProject }) {
  //swtich handlers
  const [isCreateTodo, setIsCreateTodo] = useState(true);
  const [isCreateProject, setIsCreateProject] = useState(false);
  //!drilled
  //*used

  const { resetInputs } = useContext(inputContext);

  return ReactDOM.createPortal(
    <div className="dark-overlay">
      <div className="add-div">
        <header className="create-header">
          Create a new...
          <CgClose
            type="button"
            className="close"
            onClick={() => {
              setIsOpen(false);
              resetInputs();
            }}
          >
            {" "}
            close
          </CgClose>
        </header>
        <nav className="create-selection">
          <button
            style={isCreateTodo ? { fontWeight: "bolder" } : null}
            type="button"
            onClick={() => {
              setIsCreateProject(false);
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
              setIsCreateProject(true);
            }}
          >
            {isCreateProject && <p>//</p>}
            Project
          </button>
        </nav>
        <div className="create-display">
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
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Addform;
