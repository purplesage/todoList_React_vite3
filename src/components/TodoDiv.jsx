import React, { useState, useContext } from "react";
import { inputContext } from "../context/InputHandling";
import DetailsDiv from "./DetailsDiv";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

function TodoDiv({
  title,
  details,
  dueDate,
  id,
  handleTodoDelete,
  EditInputs,
  borderColor,
  handleIsTabOpen,
  todoIsDone,
  handleIsDone,
  todoProject,
  todoPriority,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const {
    inputTitle,
    setInputTitle,
    setInputDate,
    makeTodoObject,
    setInputPriority,
    setInputDetails,
    inputDetails,
  } = useContext(inputContext);

  const editInputs = () => (
    <EditInputs
      todoTitle={title}
      setIsOpen={setOpenEdit}
      setInputTitle={setInputTitle}
      setInputDate={setInputDate}
      makeTodoObject={makeTodoObject}
      inputTitle={inputTitle}
      id={id}
      handleIsTabOpen={handleIsTabOpen}
      dueDate={dueDate}
      setInputPriority={setInputPriority}
      setInputDetails={setInputDetails}
      todoPriority={todoPriority}
      todoDetails={details}
      todoProject={todoProject}
      inputDetails={inputDetails}
    />
  );

  const detailsDiv = () => (
    <DetailsDiv
      title={title}
      dueDate={dueDate}
      details={details}
      setOpenDetails={setOpenDetails}
      todoProject={todoProject}
    />
  );

  return (
    <div
      className="todo-div"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="left-items">
        <input
          type="checkbox"
          name="todo-done"
          id="todo-done"
          onChange={() => handleIsDone(id)}
          checked={todoIsDone}
        />
        {todoIsDone ? (
          <p>
            <s>{title}</s>
          </p>
        ) : (
          <p>{title}</p>
        )}
      </div>

      {openEdit && editInputs()}
      {!openEdit && openDetails && detailsDiv()}

      <div className="right-items">
        <button
          className="details"
          type="button"
          onClick={() => setOpenDetails(true)}
        >
          DETAILS
        </button>
        <p className="due-date">{dueDate}</p>

        <FiEdit
          type="button"
          onClick={() => {
            setOpenEdit(true);
          }}
        />

        <BsFillTrashFill type="button" onClick={() => handleTodoDelete(id)} />
      </div>
    </div>
  );
}

export default TodoDiv;
