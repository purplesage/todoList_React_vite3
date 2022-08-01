import React, { useContext } from "react";
import { appDataContext } from "../context/DataContext";
import { inputContext } from "../context/InputHandling";
import styles from "../styles/modules/addTodo.module.css";

function AddTodo({ resetInputs, setIsOpen, isProject }) {
  const { handleAddTodo, setIsMobileNav } = useContext(appDataContext);

  const {
    inputTitle,
    setInputTitle,
    setInputDate,
    makeTodoObject,
    setInputPriority,
    inputDetails,
    setInputDetails,
  } = useContext(inputContext);

  return (
    <div className={styles.addTodoSection}>
      <form
        className={styles.addTodoForm}
        action="add-todo"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo(makeTodoObject(), isProject);
          resetInputs();
          setIsOpen(false);
          setIsMobileNav(false);
        }}
      >
        <div className={styles.topItems}>
          <label htmlFor="todo-title">
            <input
              required
              autoComplete="off"
              placeholder="Title:"
              maxLength="30"
              value={inputTitle}
              type="text"
              name="todo-title"
              id="todo-title"
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </label>
          <label htmlFor="todo-details">
            <textarea
              autoComplete="off"
              placeholder="Details:"
              type="text"
              name="todo-details"
              id="todo-details"
              value={inputDetails}
              onChange={(e) => setInputDetails(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.bottomItems}>
          <label className={styles.dateLabel} htmlFor="todo-dueDate">
            <p>Due Date:</p>
            <input
              required
              onChange={(e) => setInputDate(e.target.value)}
              type="date"
              name="todo-dueDate"
              id="todo-dueDate"
            />
          </label>
          <div className={styles.priorityInputs}>
            <p>Priority:</p>
            <label htmlFor="todo-Priority">
              <fieldset>
                <label
                  htmlFor="todo-Priority"
                  style={{ color: "limegreen", fontWeight: "bold" }}
                >
                  LOW
                  <input
                    required
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
                  htmlFor="todo-Priority"
                  style={{ color: "crimson", fontWeight: "bold" }}
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
            </label>
            <button type="submit">ADD TO DO</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
