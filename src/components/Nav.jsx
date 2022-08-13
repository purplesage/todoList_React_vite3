import React, { useContext } from "react";
import { appDataContext } from "../context/DataContext";
import ProjectButton from "./ProjectButton";
import { IoAddOutline } from "react-icons/io5";
import styles from "../styles/modules/nav.module.css";
import SignOut from "./SignOut";

export default function Nav({ setIsOpen, isOpen, setIsProject }) {
  const {
    todoList,
    todayFilter,
    thisWeekFilter,
    projectList,
    requireTabState,
    handleOpenTab,
    isMobileNav,
  } = useContext(appDataContext);

  const listLength = (list) => {
    return list.filter((todoObject) => todoObject.done === false).length;
  };

  const todoListLength = listLength(todoList);

  const todayLength = listLength(todayFilter);

  const thisWeekLength = listLength(thisWeekFilter);

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
    <nav
      style={isMobileNav ? { display: "flex" } : null}
      className={styles.sideNav}
    >
      <div className={styles.defaultTabs}>
        <button
          type="button"
          style={tabIsSelectedStyle("home21133")}
          onClick={() => {
            setIsProject(false);
            handleOpenTab("home21133");
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
          {todoListLength > 0 && (
            <p className={styles.number}>{todoListLength}</p>
          )}
        </button>
        <button
          type="button"
          style={tabIsSelectedStyle("today21133")}
          onClick={() => {
            setIsProject(false);
            handleOpenTab("today21133");
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
            handleOpenTab("week21133");
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

        <button
          type="button"
          style={tabIsSelectedStyle("folders21133")}
          onClick={() => {
            setIsProject(false);
            handleOpenTab("folders21133");
          }}
        >
          {requireTabState("folders21133") ? (
            <span className={styles.defaultSpan}>
              <p>// Folders</p>
            </span>
          ) : (
            <span className={styles.defaultSpan}>
              <p>Folders</p>
            </span>
          )}
          {/* {thisWeekLength > 0 && (
            <p className={styles.number}>{thisWeekLength}</p>
          )} */}
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
              listLength={listLength}
            />
          ))}
      </div>

      <IoAddOutline
        className={styles.addButton}
        type="button"
        onClick={() => delayedOpen()}
      />

      {isMobileNav && (
        <div className={styles.signOut}>
          <SignOut /> <p>Sign Out</p>
        </div>
      )}
    </nav>
  );
}
