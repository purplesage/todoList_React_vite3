import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { makeTodoContext } from "../context/DataContext";

export default function EditInputs({
  todoTitle,
  todoDetails,
  dueDate,
  setIsOpen,
  setInputTitle,
  inputTitle,
  setInputDate,
  makeTodoObject,
  id,
  setInputPriority,
  todoProject,
  todoPriority,
  setInputDetails,
  inputDetails,
}) {
  const { handleEditTodo } = useContext(makeTodoContext);

  const todoObjectToEdit = () => {
    return {
      id,
      todoTitle,
      todoDetails: todoDetails || "",
      dueDate,
      todoPriority,
      todoProject,
    };
  };

  return ReactDOM.createPortal(
    <>
      <div className="edit-div">
        <form
          className="edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditTodo(makeTodoObject(true, todoObjectToEdit()));
            setIsOpen(false);
          }}
        >
          <label htmlFor="todo-title">
            Title:
            <input
              maxLength="25"
              type="text"
              name="todo-title"
              id="todo-title"
              placeholder={todoTitle}
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </label>

          <label htmlFor="todo-details">
            Details:
            <input
              value={inputDetails}
              maxLength="50"
              type="text"
              name="todo-details"
              id="todo-details"
              placeholder={todoDetails}
              onChange={(e) => setInputDetails(e.target.value)}
            />
          </label>

          <label htmlFor="todo-dueDate">
            Due Date:
            <input
              value={dueDate}
              type="date"
              name="todo-dueDate"
              id="todo-dueDate"
              onChange={(e) => {
                setInputDate(e.target.value);
              }}
            />
          </label>

          <label htmlFor="todo-Priority">
            Priority:
            <fieldset>
              <label htmlFor="todo-Priority">
                LOW
                <input
                  type="radio"
                  name="todo-priority"
                  id="green-radio"
                  value="green"
                  onChange={(e) => setInputPriority(e.target.value)}
                />
              </label>

              <label htmlFor="todo-Priority">
                MEDIUM
                <input
                  type="radio"
                  name="todo-priority"
                  id="yellow-radio"
                  value="orange"
                  onChange={(e) => setInputPriority(e.target.value)}
                />
              </label>

              <label htmlFor="todo-Priority">
                HIGH
                <input
                  type="radio"
                  name="todo-priority"
                  id="red-radio"
                  value="crimson"
                  onChange={(e) => setInputPriority(e.target.value)}
                />
              </label>
            </fieldset>
          </label>

          <button type="submit">Save</button>
        </form>
        <button type="button" onClick={() => setIsOpen(false)}>
          cancel
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
