import React from "react";
import { BsGoogle } from "react-icons/bs";
import styles from "../../styles/modules/signin.module.css";

function SignIn({
  setIsUserSigninUp,
  signInSubmitHandler,
  signInWithGoogle,
  isError,
}) {
  return (
    <form
      className={styles.signInForm}
      onSubmit={(e) => {
        signInSubmitHandler(e);
      }}
    >
      <h1>Sign In</h1>
      {isError && (
        <p
          style={{
            backgroundColor: "crimson",
            color: "white",
            padding: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Invalid email or password
        </p>
      )}
      <label htmlFor="email">
        <p>Email Adress:</p>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
      </label>

      <label htmlFor="password">
        <p>Password:</p>
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
      </label>
      <div className={styles.actionButtons}>
        <button className={styles.signInButton} type="submit">
          Sign In
        </button>
        <hr />
        <button
          className={styles.signInGoogle}
          type="button"
          onClick={() => signInWithGoogle()}
        >
          <p>Use Google</p>
          <BsGoogle />
        </button>
        <div className={styles.signUpSwitch}>
          <p>Not a member?</p>
          <button type="button" onClick={() => setIsUserSigninUp(true)}>
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
