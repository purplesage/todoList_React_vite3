import React from "react";

function SignIn({ setIsUserSigninUp, signInSubmitHandler, signInWithGoogle }) {
  return (
    <form className="login-form" onSubmit={(e) => signInSubmitHandler(e)}>
      <h1>Sign in</h1>
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
      <button type="submit">Log in</button>
      <button type="button" onClick={() => signInWithGoogle()}>
        login with google
      </button>
      <button type="button" onClick={() => setIsUserSigninUp(true)}>
        You don't have an accout? Register
      </button>
    </form>
  );
}

export default SignIn;
