import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { auth, googleProvider } from "../../util/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function loginForm() {
  const [isUserSigninUp, setIsUserSigninUp] = useState(false);

  const SignUpSubmitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInSubmitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <>
      {!isUserSigninUp ? (
        <SignIn
          setIsUserSigninUp={setIsUserSigninUp}
          signInSubmitHandler={signInSubmitHandler}
          signInWithGoogle={signInWithGoogle}
        />
      ) : (
        <SignUp
          setIsUserSigninUp={setIsUserSigninUp}
          SignUpSubmitHandler={SignUpSubmitHandler}
        />
      )}
    </>
  );
}

export default loginForm;
