import React, { useState } from "react";
import TodoApp from "./routes/todo/TodoApp";
import DataContext from "./context/DataContext";
import AuthSection from "./routes/login/AuthSection";
import { auth } from "./util/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import styles from "./styles/modules/app.module.css";

function App() {
  const [globalUser, setGlobalUser] = useState(null);

  //todo: add 'user doesn't exist' handler state.
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setGlobalUser(false);
      return;
    }

    setGlobalUser(user);
  });

  return (
    <div className={styles.app}>
      <DataContext userEmail={globalUser ? globalUser.email : null}>
        {!globalUser ? <AuthSection /> : <TodoApp />}
      </DataContext>
    </div>
  );
}

export default App;
