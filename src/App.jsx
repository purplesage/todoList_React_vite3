import React, { useState } from "react";
import TodoApp from "./routes/todo/TodoApp";
// import DataContext from "./context/DataContext";
import TodoListContext from "./context/TodoListContext";
import ProjectListContext from "./context/ProjectListContext";
import TabHandlingContext from "./context/TabHandlingContext";
import FolderListContext from "./context/FolderListContext";
import UtilityContext from "./context/UtilityContext";
import styles from "./styles/modules/app.module.css";
import AuthSection from "./routes/login/AuthSection";
import { auth } from "./util/firebaseConfig";

import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [globalUser, setGlobalUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setGlobalUser(false);
      return;
    }

    setGlobalUser(user);
  });

  return (
    <div className={styles.app}>
      <UtilityContext>
        <TodoListContext>
          <ProjectListContext>
            <TabHandlingContext>
              <FolderListContext>
                {!globalUser ? (
                  <AuthSection />
                ) : (
                  <TodoApp userEmail={globalUser ? globalUser.email : null} />
                )}
              </FolderListContext>
            </TabHandlingContext>
          </ProjectListContext>
        </TodoListContext>
      </UtilityContext>
    </div>
  );
}

export default App;

{
  /* <div className={styles.app}>
      <DataContext userEmail={globalUser ? globalUser.email : null}>
        {!globalUser ? <AuthSection /> : <TodoApp />}
      </DataContext>
    </div> */
}
