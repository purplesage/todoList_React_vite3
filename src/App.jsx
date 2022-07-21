import React, { useState } from "react";
import TodoApp from "./routes/todo/TodoApp";
import DataContext from "./context/DataContext";
import LoginForm from "./routes/login/LoginForm";
import { auth } from "./util/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

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
    <div className="app">
      <DataContext userEmail={globalUser ? globalUser.email : null}>
        {!globalUser ? <LoginForm /> : <TodoApp />}
      </DataContext>
    </div>
  );
}

export default App;
