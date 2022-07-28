import React from "react";
import TodoDiv from "../../../components/TodoDiv";
import EditInputs from "../../../components/EditInputs";
import styles from "../../../styles/modules/list.module.css";

export default function List({ todoList, emptyMessage }) {
  return (
    <ul className={styles.todoUl}>
      {todoList.length > 0
        ? todoList.map((todoObject) => (
            <li key={todoObject.id}>
              <TodoDiv
                borderColor={todoObject.priority}
                id={todoObject.id}
                title={todoObject.title}
                dueDate={todoObject.dueDate}
                EditInputs={EditInputs}
                details={todoObject.details}
                todoIsDone={todoObject.done}
                todoProject={todoObject.project}
                todoPriority={todoObject.priority}
              />
            </li>
          ))
        : emptyMessage}
    </ul>
  );
}
