import React from "react";
import { BsGoogle } from "react-icons/bs";

function SignIn({ setIsUserSigninUp, signInSubmitHandler, signInWithGoogle }) {
  return (
    <form className="login-form" onSubmit={(e) => signInSubmitHandler(e)}>
      <h1>Sign In</h1>
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
      <div className="action-buttons">
        <button className="sign-in-button" type="submit">
          Sign In
        </button>
        <hr />
        <button
          className="sign-in-google"
          type="button"
          onClick={() => signInWithGoogle()}
        >
          <p>Use Google</p>
          <BsGoogle />
        </button>
        <div className="sign-up-button">
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
