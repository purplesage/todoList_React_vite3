import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { todoListContext } from "../context/TodoListContext";
import { inputContext } from "../context/InputHandling";
import styles from "../styles/modules/editInputs.module.css";

import { CgClose } from "react-icons/cg";

export default function EditInputs({
  todoTitle,
  todoDetails,
  dueDate,
  setIsOpen,
  id,
  todoProject,
  todoPriority,
}) {
  const { handleEditTodo } = useContext(todoListContext);

  const {
    setInputTitle,
    setInputDate,
    makeTodoObject,
    inputTitle,
    setInputPriority,
    setInputDetails,
    inputDetails,
    resetInputs,
  } = useContext(inputContext);

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
      <div className="dark-overlay">
        <div className={styles.editDiv}>
          <form
            className={styles.editForm}
            onSubmit={(e) => {
              e.preventDefault();
              handleEditTodo(makeTodoObject(true, todoObjectToEdit()));
              setIsOpen(false);
              resetInputs();
            }}
          >
            <CgClose
              className={styles.close}
              type="button"
              onClick={() => {
                setIsOpen(false);
                resetInputs();
              }}
            />
            <div className={styles.topItems}>
              <label htmlFor="todo-title">
                <input
                  autoComplete="off"
                  maxLength="35"
                  type="text"
                  name="todo-title"
                  id="todo-title"
                  placeholder={`Title: ${todoTitle}`}
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                />
              </label>
              <label htmlFor="todo-details">
                <textarea
                  autoComplete="off"
                  value={inputDetails}
                  type="text"
                  name="todo-details"
                  id="todo-details"
                  placeholder={`Details: ${todoDetails}`}
                  onChange={(e) => setInputDetails(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.bottomItems}>
              <label className={styles.dateInput} htmlFor="todo-dueDate">
                <b>Due Date:</b>

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
              <label
                className={styles.priorityInputs}
                htmlFor="todo-Priority"
                style={{ color: "limegreen", fontWeight: "bold" }}
              >
                <p style={{ fontWeight: "bold", color: "black" }}>Priority:</p>
                <fieldset>
                  <label htmlFor="todo-Priority">
                    LOW
                    <input
                      type="radio"
                      name="todo-priority"
                      id="green-radio"
                      value="limegreen"
                      onChange={(e) => setInputPriority(e.target.value)}
                    />
                  </label>
                  <label
                    htmlFor="todo-Priority"
                    style={{ color: "orange", fontWeight: "bold" }}
                  >
                    MEDIUM
                    <input
                      type="radio"
                      name="todo-priority"
                      id="yellow-radio"
                      value="orange"
                      onChange={(e) => setInputPriority(e.target.value)}
                    />
                  </label>

                  <label
                    style={{ color: "crimson", fontWeight: "bold" }}
                    htmlFor="todo-Priority"
                  >
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
                <button type="submit">CONFIRM EDIT</button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
