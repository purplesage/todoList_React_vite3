import React, { useContext, useState } from "react";
import InputHandling from "../../context/InputHandling";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Display from "./display/Display";
import Addform from "../../components/Addform";
import { makeTodoContext } from "../../context/DataContext";

function TodoApp() {
  //add form conditional openning state
  const [isOpen, setIsOpen] = useState(false);

  //currently in a project tab check
  const [isProject, setIsProject] = useState(false);

  //tab styling on click props.
  const { requireTab, handleAddProjectTab, handleIsTabOpen } =
    useContext(makeTodoContext);

  //todo: fetch todo list from here.

  return (
    <div className="todo-section">
      <Header />
      <Nav
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setIsProject={setIsProject}
        requireTab={requireTab}
        handleIsTabOpen={handleIsTabOpen}
      />
      <InputHandling>
        <Display
          isProject={isProject}
          setIsProject={setIsProject}
          requireTab={requireTab}
          handleIsTabOpen={handleIsTabOpen}
        />
        {isOpen && (
          <Addform
            setIsOpen={setIsOpen}
            isProject={isProject}
            setIsProject={setIsProject}
            handleAddProjectTab={handleAddProjectTab}
            handleIsTabOpen={handleIsTabOpen}
          />
        )}
      </InputHandling>
    </div>
  );
}

export default TodoApp;
