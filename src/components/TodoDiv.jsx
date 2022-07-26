import React, { useState, useContext } from "react";
import { makeTodoContext } from "../context/DataContext";
import DetailsDiv from "./DetailsDiv";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

function TodoDiv({
  title,
  details,
  dueDate,
  id,
  EditInputs,
  borderColor,
  todoIsDone,
  todoProject,
  todoPriority,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const { handleTodoDelete, handleIsDone } = useContext(makeTodoContext);

  return (
    <div
      className="todo-div"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className="left-items">
        <input
          disabled={todoIsDone}
          type="checkbox"
          name="todo-done"
          id="todo-done"
          onChange={() => handleIsDone(id)}
          checked={todoIsDone}
        />
        {todoIsDone ? (
          <p style={{ color: "rgba(14, 13, 13, 0.3)" }}>
            <s>{title}</s>
          </p>
        ) : (
          <p>{title}</p>
        )}
      </div>

      {openEdit && (
        <EditInputs
          todoTitle={title}
          setIsOpen={setOpenEdit}
          id={id}
          dueDate={dueDate}
          todoPriority={todoPriority}
          todoDetails={details}
          todoProject={todoProject}
        />
      )}
      {!openEdit && openDetails && (
        <DetailsDiv
          title={title}
          dueDate={dueDate}
          details={details}
          setOpenDetails={setOpenDetails}
          todoProject={todoProject}
        />
      )}

      <div className="right-items">
        <button
          className="details"
          type="button"
          onClick={() => setOpenDetails(true)}
        >
          DETAILS
        </button>
        {todoIsDone ? (
          <p className="due-date" style={{ color: "rgba(14, 13, 13, 0.3)" }}>
            {dueDate}
          </p>
        ) : (
          <p className="due-date">{dueDate}</p>
        )}

        <button
          disabled={todoIsDone}
          type="button"
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          <FiEdit
            style={{ color: todoIsDone ? "rgba(105, 41, 76, 0.3)" : null }}
          />
        </button>

        <BsFillTrashFill type="button" onClick={() => handleTodoDelete(id)} />
      </div>
    </div>
  );
}

export default TodoDiv;
