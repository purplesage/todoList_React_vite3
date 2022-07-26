import React from "react";

function SignUp({ setIsUserSigninUp, SignUpSubmitHandler }) {
  return (
    <form className="login-form" onSubmit={(e) => SignUpSubmitHandler(e)}>
      <h1>Sign Up</h1>
      <label htmlFor="email">
        Email Adress
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
        />
      </label>

      <label htmlFor="password">
        Password
        <input required type="password" name="password" id="password" />
      </label>
      <button type="submit">Register</button>
      <button type="button" onClick={() => setIsUserSigninUp(false)}>
        Already have an account? Log in
      </button>
    </form>
  );
}

export default SignUp;
