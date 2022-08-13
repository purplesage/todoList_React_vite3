import React, { createContext, useReducer, useEffect } from "react";
import { dataBase } from "../util/firebaseConfig";

import { doc, updateDoc } from "firebase/firestore";
import isThisWeek from "date-fns/esm/isThisWeek/index";
import parseISO from "date-fns/esm/fp/parseISO/index";

const todoListContext = createContext({});

function TodoListContext({ children, userEmail }) {
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "add_todo": {
        return [...state, action.todoObject];
      }

      case "delete_todo": {
        return state.filter((todoObject) => todoObject.id !== action.id);
      }

      case "edit_todo": {
        return state.map((todoObject) =>
          todoObject.id === action.todoObject.id
            ? { ...action.todoObject, project: todoObject.project || "" }
            : todoObject
        );
      }

      case "handle_done_todo": {
        return state.map((todoObject) =>
          todoObject.id === action.id
            ? { ...todoObject, done: !todoObject.done }
            : todoObject
        );
      }

      case "load_todos": {
        return [...action.list];
      }
    }
    throw Error(`Unknown action: ${action.type}`);
  };

  const [todoList, dispatcher] = useReducer(todoListReducer, []);

  const handleAddTodo = (todoObject, isProject) => {
    if (!isProject) {
      dispatcher({ type: "add_todo", todoObject });
      return;
    }
    const projectTodo = { ...todoObject, project: inputRef.current };
    dispatcher({ type: "add_todo", todoObject: projectTodo });
  };

  const handleLoadTodos = (todos) => {
    dispatcher({ type: "load_todos", list: todos });
  };

  const handleTodoDelete = (id) => {
    dispatcher({ type: "delete_todo", id });
  };

  const handleEditTodo = (todoObject) => {
    dispatcher({ type: "edit_todo", todoObject });
  };

  const handleIsDone = (id) => {
    dispatcher({ type: "handle_done_todo", id });
  };

  const todayFilter = (() => {
    const today = format(new Date(), "Y-MM-dd");
    return todoList.filter((todoObj) => todoObj.dueDate === today);
  })();

  const thisWeekFilter = todoList.filter(
    (todoObj) => isThisWeek(new Date(parseISO(todoObj.dueDate))) === true
  );

  //* update firestore todoList on state change.
  useEffect(() => {
    const updateTodoList = async () => {
      const docRef = doc(dataBase, `users/${userEmail}`);
      await updateDoc(docRef, { todoList });
    };

    if (!isLoading) {
      updateTodoList();
    }
  }, [todoList]);

  return (
    <todoListContext.Provider
      value={{
        todoList,
        handleAddTodo,
        handleLoadTodos,
        handleTodoDelete,
        handleEditTodo,
        handleIsDone,
        todayFilter,
        thisWeekFilter,
      }}
    >
      {children}
    </todoListContext.Provider>
  );
}

export default TodoListContext;
