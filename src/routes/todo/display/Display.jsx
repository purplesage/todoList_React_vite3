import React, { useContext } from "react";
import List from "./List";
import { todoListContext } from "../../../context/TodoListContext";
import { projectListContext } from "../../../context/ProjectListContext";
import { utilityContext } from "../../../context/UtilityContext";
import { tabHandlingContext } from "../../../context/TabHandlingContext";
import { folderListContext } from "../../../context/FolderListContext";

import DeleteProject from "../../../components/DeleteProject";
import styles from "../../../styles/modules/display.module.css";
import Notification from "../../../components/Notification";
import FolderList from "../../../components/FolderList";

function Display({ isProject, setIsProject }) {
  const { todoList, todayFilter, thisWeekFilter, projectFilter } =
    useContext(todoListContext);
  const { projectFilterName } = useContext(projectListContext);
  const { error, isLoading, notificationDisplay } = useContext(utilityContext);
  const { requireTabState } = useContext(tabHandlingContext);
  const { folderList } = useContext(folderListContext);

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

      {requireTabState("folders21133") && <FolderList list={folderList} />}

      <Notification message={"//Added"} display={notificationDisplay} />
    </section>
  );
}

export default Display;
