import React, { useContext } from "react";
import { makeTodoContext } from "../context/DataContext";
import { inputContext } from "../context/InputHandling";
import format from "date-fns/format";
import parseISO from "date-fns/esm/fp/parseISO/index";

function AddTodo({ resetInputs, setIsOpen, isProject }) {
  const { handleAddTodo } = useContext(makeTodoContext);

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
    <div className="add-todo-section">
      <form
        className="add-todo-form"
        action="add-todo"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo(makeTodoObject(), isProject);
          resetInputs();
          setIsOpen(false);
        }}
      >
        <div className="top-items">
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

        <div className="bottom-items">
          <label className="date-label" htmlFor="todo-dueDate">
            <p>Due Date:</p>
            <input
              required
              onChange={(e) =>
                setInputDate(
                  format(new Date(parseISO(e.target.value)), "MMMM do")
                )
              }
              type="date"
              name="todo-dueDate"
              id="todo-dueDate"
            />
          </label>
          <div className="priority-inputs">
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
