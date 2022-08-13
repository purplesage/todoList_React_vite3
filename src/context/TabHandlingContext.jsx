import React, { createContext, useReducer } from "react";

export const tabHandlingContext = createContext({});

function TabHandlingContext({ children }) {
  function tabReducer(state, action) {
    switch (action.type) {
      case "set_is_open": {
        return state.map((tabObject) =>
          tabObject.name === action.tabName
            ? { ...tabObject, state: true }
            : { ...tabObject, state: false }
        );
      }

      case "add_project_tab": {
        return [...state, action.projectTab];
      }
    }
  }

  const [tabList, tabDispatcher] = useReducer(tabReducer, [
    { name: "home21133", state: true },
    { name: "today21133", state: false },
    { name: "week21133", state: false },
    { name: "folders21133", state: false },
  ]);

  function handleOpenTab(tabName) {
    tabDispatcher({
      type: "set_is_open",
      tabName,
    });
  }

  function handleAddProjectTab(projectName, onLoad) {
    tabDispatcher({
      type: "add_project_tab",
      projectTab: { name: projectName, state: onLoad ? false : true },
    });
  }

  function requireTabState(tabName) {
    const tab = tabList.find((tabObject) => tabObject.name === tabName);
    if (tab) {
      const state = tab.state;
      return state;
    }
  }
  return (
    <tabHandlingContext.Provider
      value={{ handleOpenTab, handleAddProjectTab, requireTabState }}
    >
      {children}
    </tabHandlingContext.Provider>
  );
}

export default TabHandlingContext;
