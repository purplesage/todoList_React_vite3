import React, { useContext } from "react";
import { makeTodoContext } from "../context/DataContext";
import ProjectButton from "./ProjectButton";
import { IoAddOutline } from "react-icons/io5";
import styles from "../styles/modules/nav.module.css";

export default function Nav({ setIsOpen, isOpen, setIsProject }) {
  const {
    todoList,
    todayFilter,
    thisWeekFilter,
    projectList,
    requireTabState,
    handleIsTabOpen,
  } = useContext(makeTodoContext);

  const todayLength = todayFilter.length;
  const thisWeekLength = thisWeekFilter.length;

  const tabIsSelectedStyle = (tab) => {
    return {
      fontWeight: requireTabState(tab) ? "bold" : "normal",
    };
  };

  // made for animation purposes.
  const delayedOpen = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 50);
  };

  return (
    <nav className={styles.sideNav}>
      <div className={styles.defaultTabs}>
        <button
          type="button"
          style={tabIsSelectedStyle("home21133")}
          onClick={() => {
            setIsProject(false);
            handleIsTabOpen("home21133");
          }}
        >
          {requireTabState("home21133") ? (
            <span className={styles.defaultSpan}>
              <p>// Home</p>
            </span>
          ) : (
            <span className={styles.defaultSpan}>
              <p>Home</p>
            </span>
          )}
          {todoList.length > 0 && (
            <p className={styles.number}>{todoList.length}</p>
          )}
        </button>
        <button
          type="button"
          style={tabIsSelectedStyle("today21133")}
          onClick={() => {
            setIsProject(false);
            handleIsTabOpen("today21133");
          }}
        >
          {requireTabState("today21133") ? (
            <span className={styles.defaultSpan}>
              <p>// Today</p>
            </span>
          ) : (
            <span className={styles.defaultSpan}>
              <p>Today</p>
            </span>
          )}
          {todayLength > 0 && <p className={styles.number}>{todayLength}</p>}
        </button>
        <button
          type="button"
          style={tabIsSelectedStyle("week21133")}
          onClick={() => {
            setIsProject(false);
            handleIsTabOpen("week21133");
          }}
        >
          {requireTabState("week21133") ? (
            <span className={styles.defaultSpan}>
              <p>// Week</p>
            </span>
          ) : (
            <span className={styles.defaultSpan}>
              <p>Week</p>
            </span>
          )}
          {thisWeekLength > 0 && (
            <p className={styles.number}>{thisWeekLength}</p>
          )}
        </button>
      </div>

      <p className={styles.projectHeader}>Projects:</p>
      <div className={styles.projectTabs}>
        {projectList.length > 0 &&
          projectList.map((project, index) => (
            <ProjectButton
              key={index}
              type="button"
              setIsProject={setIsProject}
              projectName={project.value}
            />
          ))}
      </div>

      <IoAddOutline
        className={styles.addButton}
        type="button"
        onClick={() => delayedOpen()}
      />
    </nav>
  );
}
