import React, { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const inputContext = createContext({});

export default function InputHandling({ children }) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputPriority, setInputPriority] = useState("");
  const [inputDetails, setInputDetails] = useState("");

  const resetInputs = () => {
    setInputTitle("");
    setInputDate("");
    setInputPriority("");
    setInputDetails("");
  };

  function makeTodoObject(edit, todoToEdit = {}) {
    return {
      id: edit ? todoToEdit.id : uuid(),
      title: inputTitle || todoToEdit.title,
      dueDate: inputDate || todoToEdit.dueDate,
      priority: inputPriority || todoToEdit.todoPriority,
      details: inputDetails === undefined ? todoToEdit.todoDetails : "",
      project: todoToEdit.todoProject || "",
      done: false,
    };
  }

  return (
    <inputContext.Provider
      value={{
        inputTitle,
        setInputTitle,
        inputDate,
        setInputDate,
        makeTodoObject,
        resetInputs,
        setInputPriority,
        inputPriority,
        inputDetails,
        setInputDetails,
      }}
    >
      {children}
    </inputContext.Provider>
  );
}
