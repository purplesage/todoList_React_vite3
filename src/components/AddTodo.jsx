import React from "react";

function AddTodo(props) {
  return (
    <div className="add-todo-form">
      <form
        className="add-todo"
        action="add-todo"
        onSubmit={(e) => {
          e.preventDefault();
          props.handleAddTodo(props.makeTodoObject(), props.isProject);
          props.resetInputs();
          props.setIsOpen(false);
        }}
      >
        <label htmlFor="todo-title">
          Title:
          <input
            required
            autoComplete="off"
            maxLength="25"
            value={props.inputTitle}
            type="text"
            name="todo-title"
            id="todo-title"
            onChange={(e) => props.setInputTitle(e.target.value)}
          />
        </label>

        <label htmlFor="todo-details">
          Details:
          <input
            autoComplete="off"
            maxLength="50"
            type="text"
            name="todo-details"
            id="todo-details"
            value={props.inputDetails}
            onChange={(e) => props.setInputDetails(e.target.value)}
          />
        </label>

        <label htmlFor="todo-dueDate">
          Due Date:
          <input
            required
            onChange={(e) => props.setInputDate(e.target.value)}
            type="date"
            name="todo-dueDate"
            id="todo-dueDate"
          />
        </label>

        <label htmlFor="todo-Priority">
          Priority:
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
                value="goldenrod"
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

        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default AddTodo;
