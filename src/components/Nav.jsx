import React, { useContext } from "react";
import { makeTodoContext } from "../context/DataContext";
import ProjectButton from "./ProjectButton";
import { IoAddOutline } from "react-icons/io5";

export default function Nav({
  setIsOpen,
  isOpen,
  setIsProject,
  requireTab,
  handleIsTabOpen,
}) {
  const {
    todoList,
    todayFilter,
    thisWeekFilter,
    projectList,
    setProjectFilterName,
    projectFilter,
    updateRef,
  } = useContext(makeTodoContext);

  const todayLength = todayFilter.length;
  const thisWeekLength = thisWeekFilter.length;

  const tabIsSelectedStyle = (tab) => {
    return {
      fontWeight: requireTab(tab) ? "bold" : "normal",
    };
  };

  // made for animation purposes.
  const delayedOpen = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 50);
  };

  return (
    <nav className="side-nav">
      <div className="default-tabs">
        <button
          type="button"
          style={tabIsSelectedStyle("home21133")}
          onClick={() => {
            setIsProject(false);
            handleIsTabOpen("home21133");
          }}
        >
          {requireTab("home21133") ? (
            <span className="default-span">
              <p>// Home</p>
            </span>
          ) : (
            <span className="default-span">
              <p>Home</p>
            </span>
          )}
          {todoList.length > 0 && <p className="number">{todoList.length}</p>}
        </button>
        <button
          type="button"
          style={tabIsSelectedStyle("today21133")}
          onClick={() => {
            setIsProject(false);
            handleIsTabOpen("today21133");
          }}
        >
          {requireTab("today21133") ? (
            <span className="default-span">
              <p>// Today</p>
            </span>
          ) : (
            <span className="default-span">
              <p>Today</p>
            </span>
          )}
          {todayLength > 0 && <p className="number">{todayLength}</p>}
        </button>
        <button
          type="button"
          style={tabIsSelectedStyle("week21133")}
          onClick={() => {
            setIsProject(false);
            handleIsTabOpen("week21133");
          }}
        >
          {requireTab("week21133") ? (
            <span className="default-span">
              <p>// Week</p>
            </span>
          ) : (
            <span className="default-span">
              <p>Week</p>
            </span>
          )}
          {thisWeekLength > 0 && <p className="number">{thisWeekLength}</p>}
        </button>
      </div>

      <p className="p-header">Projects:</p>
      <div className="project-tabs">
        {projectList.length > 0 &&
          projectList.map((project, index) => (
            <ProjectButton
              key={index}
              type="button"
              setIsProject={setIsProject}
              projectName={project.value}
              projectFilter={projectFilter}
              setProjectFilterName={setProjectFilterName}
              requireTab={requireTab}
              handleIsTabOpen={handleIsTabOpen}
              updateRef={updateRef}
            />
          ))}
      </div>

      <IoAddOutline
        className="add-button"
        type="button"
        onClick={() => delayedOpen()}
      />
    </nav>
  );
}
