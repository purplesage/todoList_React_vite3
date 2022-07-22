import React, { useContext } from "react";
import List from "./List";
import { makeTodoContext } from "../../../context/DataContext";
import DeleteProject from "../../../components/DeleteProject";

function Display({ isProject, setIsProject, requireTab, handleIsTabOpen }) {
  const {
    handleTodoDelete,
    todoList,
    todayFilter,
    thisWeekFilter,
    projectFilter,
    projectFilterName,
    handleDeleteProject,
    handleIsDone,
    projectList,
    error,
    isLoading,
  } = useContext(makeTodoContext);

  const handleMissingContent = (error, isLoading) => {
    if (error) {
      return (
        <p
          style={{
            color: "red",
            fontWeight: "bolder",
          }}
        >
          Error 404: content not found.
        </p>
      );
    } else if (isLoading) {
      return (
        <p
          style={{
            color: "#69294c",
            fontWeight: "bolder",
          }}
        >
          Loading content...
        </p>
      );
    } else {
      return <p>{""}</p>;
    }
  };

  return (
    <div className="display">
      {requireTab("home21133") && (
        <List
          handleTodoDelete={handleTodoDelete}
          todoList={todoList}
          handleIsTabOpen={handleIsTabOpen}
          handleIsDone={handleIsDone}
          emptyMessage={handleMissingContent(error, isLoading)}
        />
      )}

      {requireTab("today21133") && (
        <List
          handleTodoDelete={handleTodoDelete}
          todoList={todayFilter}
          handleIsTabOpen={handleIsTabOpen}
          handleIsDone={handleIsDone}
        />
      )}

      {requireTab("week21133") && (
        <List
          handleTodoDelete={handleTodoDelete}
          todoList={thisWeekFilter}
          handleIsTabOpen={handleIsTabOpen}
          handleIsDone={handleIsDone}
        />
      )}

      {isProject && (
        <List
          handleTodoDelete={handleTodoDelete}
          todoList={projectFilter(projectFilterName)}
          handleIsTabOpen={handleIsTabOpen}
          handleIsDone={handleIsDone}
          emptyMessage={
            <DeleteProject
              projectName={projectFilterName}
              handleDeleteProject={handleDeleteProject}
              setIsProject={setIsProject}
              handleIsTabOpen={handleIsTabOpen}
              projectList={projectList}
            />
          }
        />
      )}
    </div>
  );
}

export default Display;
