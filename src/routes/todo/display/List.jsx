import React, { useContext } from "react";
import TodoDiv from "../../../components/TodoDiv";
import EditInputs from "../../../components/EditInputs";
import { makeTodoContext } from "../../../context/DataContext";

export default function List({ todoList, emptyMessage }) {
  const { handleTodoDelete, handleIsDone, handleIsTabOpen } =
    useContext(makeTodoContext);
  return (
    <ul className="todo-ul">
      {todoList.length > 0
        ? todoList.map((todoObject) => (
            <li key={todoObject.id}>
              <TodoDiv
                borderColor={todoObject.priority}
                id={todoObject.id}
                title={todoObject.title}
                dueDate={todoObject.dueDate}
                handleTodoDelete={handleTodoDelete}
                EditInputs={EditInputs}
                details={todoObject.details}
                handleIsTabOpen={handleIsTabOpen}
                todoIsDone={todoObject.done}
                handleIsDone={handleIsDone}
                todoProject={todoObject.project}
                todoPriority={todoObject.priority}
              />
            </li>
          ))
        : emptyMessage}
    </ul>
  );
}
