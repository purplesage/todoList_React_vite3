import React from "react";

function SignUp({ setIsUserSigninUp, SignUpSubmitHandler }) {
  return (
    <form className="login-form" onSubmit={(e) => SignUpSubmitHandler(e)}>
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
      <div className="action-buttons">
        <button type="submit" className="sign-in-button">
          Sign Up
        </button>
        <div className="sign-up-button">
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
