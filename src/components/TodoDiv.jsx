import React, { useState, useContext } from "react";
import DetailsDiv from "./DetailsDiv";
import styles from "../styles/modules/todoDiv.module.css";

import format from "date-fns/format";
import parseISO from "date-fns/esm/fp/parseISO/index";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { todoListContext } from "../context/TodoListContext";

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

  const { handleTodoDelete, handleIsDone } = useContext(todoListContext);

  const formatedDate = format(new Date(parseISO(dueDate)), "MMM do");

  return (
    <div
      className={styles.todoDiv}
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <div className={styles.leftItems}>
        <input
          disabled={todoIsDone}
          type="checkbox"
          name="todo-done"
          id="todo-done"
          onChange={() => handleIsDone(id)}
          checked={todoIsDone}
        />
        {todoIsDone ? (
          <p
            className={styles.title}
            style={{ color: "rgba(14, 13, 13, 0.3)" }}
          >
            <s>{title}</s>
          </p>
        ) : (
          <p className={styles.title}>{title}</p>
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

      <div className={styles.rightItems}>
        <button
          className={styles.details}
          type="button"
          onClick={() => setOpenDetails(true)}
        >
          DETAILS
        </button>
        {todoIsDone ? (
          <p
            className={styles.dueDate}
            style={{ color: "rgba(14, 13, 13, 0.3)" }}
          >
            {formatedDate}
          </p>
        ) : (
          <p className={styles.dueDate}>{formatedDate}</p>
        )}

        <button
          className={styles.editButton}
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

        <button
          className={styles.deleteButton}
          type="button"
          onClick={() => handleTodoDelete(id)}
        >
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
}

export default TodoDiv;
