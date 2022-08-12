import React, { useContext } from "react";
import List from "./List";
import { appDataContext } from "../../../context/DataContext";
import DeleteProject from "../../../components/DeleteProject";
import styles from "../../../styles/modules/display.module.css";
import Notification from "../../../components/Notification";
import StorageList from "../../../components/StorageList";
function Display({ isProject, setIsProject }) {
  const {
    todoList,
    todayFilter,
    thisWeekFilter,
    projectFilter,
    projectFilterName,
    error,
    isLoading,
    requireTabState,
    notificationDisplay,
    storageList,
  } = useContext(appDataContext);

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
    <section className={styles.display}>
      {requireTabState("home21133") && (
        <List
          todoList={todoList}
          emptyMessage={handleMissingContent(error, isLoading)}
        />
      )}

      {requireTabState("today21133") && (
        <List
          todoList={todayFilter}
          emptyMessage={handleMissingContent(error, isLoading)}
        />
      )}

      {requireTabState("week21133") && (
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

      {requireTabState("storages21133") && <StorageList list={storageList} />}

      <Notification message={"//Added"} display={notificationDisplay} />
    </section>
  );
}

export default Display;
