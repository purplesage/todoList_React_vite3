import React from "react";
import styles from "../../styles/modules/signUp.module.css";

function SignUp({ setIsUserSigninUp, SignUpSubmitHandler }) {
  return (
    <form
      className={styles.signUpForm}
      onSubmit={(e) => SignUpSubmitHandler(e)}
    >
      <h1>Sign Up</h1>
      <label htmlFor="email">
        <p>Email Adress:</p>
        <input
          autoComplete="off"
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
        <button type="submit" className={styles.signUpButton}>
          Sign Up
        </button>
        <hr />
        <div className={styles.signInSwitch}>
          <p>Already have an account?</p>
          <button type="button" onClick={() => setIsUserSigninUp(false)}>
            Sign in
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
