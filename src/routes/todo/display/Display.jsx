import React, { useContext } from "react";
import List from "./List";
import { makeTodoContext } from "../../../context/DataContext";
import DeleteProject from "../../../components/DeleteProject";

function Display({ isProject, setIsProject }) {
  const {
    todoList,
    thisWeekFilter,
    projectFilter,
    projectFilterName,
    error,
    isLoading,
    requireTab,
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
          todoList={todoList}
          emptyMessage={handleMissingContent(error, isLoading)}
        />
      )}

      {requireTab("today21133") && (
        <List
          todoList={todayFilter}
          emptyMessage={handleMissingContent(error, isLoading)}
        />
      )}

      {requireTab("week21133") && (
        <List
          todoList={thisWeekFilter}
          emptyMessage={handleMissingContent(error, isLoading)}
        />
      )}

      {isProject && (
        <List
          todoList={projectFilter(projectFilterName)}
          emptyMessage={
            <DeleteProject
              projectName={projectFilterName}
              setIsProject={setIsProject}
            />
          }
        />
      )}
    </div>
  );
}

export default Display;
