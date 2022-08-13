import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { auth, googleProvider } from "../../util/firebaseConfig";
import styles from "../../styles/modules/authSection.module.css";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { BsJournalCheck } from "react-icons/bs";

function AuthSection() {
  const [isUserSigninUp, setIsUserSigninUp] = useState(false);
  const [isError, setisError] = useState(false);

  const SignUpSubmitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      setisError(true);
    }
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  return (
    <div className={styles.auth}>
      <div className={styles.logo}>
        <p>//TO-DO</p>
        <BsJournalCheck />
        <q>
          <i>"Do or do not. There is no try."</i>
        </q>
      </div>
      {!isUserSigninUp ? (
        <SignIn
          setIsUserSigninUp={setIsUserSigninUp}
          signInSubmitHandler={signInSubmitHandler}
          signInWithGoogle={signInWithGoogle}
          isError={isError}
        />
      ) : (
        <SignUp
          setIsUserSigninUp={setIsUserSigninUp}
          SignUpSubmitHandler={SignUpSubmitHandler}
        />
      )}
    </div>
  );
}

export default AuthSection;
