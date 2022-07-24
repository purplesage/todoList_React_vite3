import React from "react";

function AddTodo(props) {
  return (
    <div className="add-todo-section">
      <form
        className="add-todo-form"
        action="add-todo"
        onSubmit={(e) => {
          e.preventDefault();
          props.handleAddTodo(props.makeTodoObject(), props.isProject);
          props.resetInputs();
          props.setIsOpen(false);
        }}
      >
        <div className="top-items">
          <label htmlFor="todo-title">
            <input
              required
              autoComplete="off"
              placeholder="Title:"
              maxLength="25"
              value={props.inputTitle}
              type="text"
              name="todo-title"
              id="todo-title"
              onChange={(e) => props.setInputTitle(e.target.value)}
            />
          </label>
          <label htmlFor="todo-details">
            <textarea
              autoComplete="off"
              placeholder="Details:"
              type="text"
              name="todo-details"
              id="todo-details"
              value={props.inputDetails}
              onChange={(e) => props.setInputDetails(e.target.value)}
            />
          </label>
        </div>

        <div className="bottom-items">
          <label className="date-label" htmlFor="todo-dueDate">
            <p>Due Date:</p>
            <input
              required
              onChange={(e) => props.setInputDate(e.target.value)}
              type="date"
              name="todo-dueDate"
              id="todo-dueDate"
            />
          </label>
          <div className="priority-inputs">
            <p>Priority:</p>
            <label htmlFor="todo-Priority">
              <fieldset>
                <label htmlFor="todo-Priority">
                  LOW
                  <input
                    required
                    type="radio"
                    name="todo-priority"
                    id="green-radio"
                    value="green"
                    onChange={(e) => props.setInputPriority(e.target.value)}
                  />
                </label>
                <label htmlFor="todo-Priority">
                  MEDIUM
                  <input
                    type="radio"
                    name="todo-priority"
                    id="yellow-radio"
                    value="orange"
                    onChange={(e) => props.setInputPriority(e.target.value)}
                  />
                </label>
                <label htmlFor="todo-Priority">
                  HIGH
                  <input
                    type="radio"
                    name="todo-priority"
                    id="red-radio"
                    value="crimson"
                    onChange={(e) => props.setInputPriority(e.target.value)}
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
