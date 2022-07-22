import React, { useContext, useState } from "react";
import { makeTodoContext } from "../context/DataContext";
import { inputContext } from "../context/InputHandling";
import AddTodo from "./AddTodo";
import AddProject from "./AddProject";
import ReactDOM from "react-dom";

function Addform({
  setIsOpen,
  isProject,
  setIsProject,
  handleAddProjectTab,
  handleIsTabOpen,
}) {
  //swtich handlers
  const [isCreateTodo, setIsCreateTodo] = useState(true);
  const [isCreateProject, setIsCreateProject] = useState(false);

  const {
    handleAddTodo,
    handleAddProject,
    projectInput,
    setProjectInput,
    setProjectFilterName,
    updateRef,
    inputRef,
  } = useContext(makeTodoContext);

  const {
    inputTitle,
    setInputTitle,
    setInputDate,
    makeTodoObject,
    setInputPriority,
    inputDetails,
    setInputDetails,
    resetInputs,
  } = useContext(inputContext);

  return ReactDOM.createPortal(
    <div className="dark-overlay">
      <div className="add-div">
        <header className="create-header">
          Create a new...
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              resetInputs();
            }}
          >
            {" "}
            close
          </button>
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
            Project
          </button>
        </nav>
        <div className="create-display">
          {isCreateTodo && (
            <AddTodo
              handleAddTodo={handleAddTodo}
              inputTitle={inputTitle}
              setInputTitle={setInputTitle}
              setInputDate={setInputDate}
              makeTodoObject={makeTodoObject}
              setInputPriority={setInputPriority}
              inputDetails={inputDetails}
              setInputDetails={setInputDetails}
              resetInputs={resetInputs}
              setIsOpen={setIsOpen}
              isProject={isProject}
              setIsProject={setIsProject}
            />
          )}
          {isCreateProject && (
            <AddProject
              handleAddProject={handleAddProject}
              setIsOpen={setIsOpen}
              projectInput={projectInput}
              setProjectInput={setProjectInput}
              setIsProject={setIsProject}
              handleAddProjectTab={handleAddProjectTab}
              handleIsTabOpen={handleIsTabOpen}
              setProjectFilterName={setProjectFilterName}
              updateRef={updateRef}
              inputRef={inputRef}
            />
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Addform;
