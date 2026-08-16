import { Link } from "react-router";

const Login = () => {
  return (
    <>
      <form className="card">
        <header>
          <h1>Login</h1>
          <p>Add your details below to get back into the app</p>
        </header>

        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="e.g. alex@email.com"
          />
          <p id="email-error" className="error-message">
            Can't be empty
          </p>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <p id="password-error" className="error-message">
            Please check again
          </p>
        </div>

        <footer>
          <button type="submit">Create new account</button>
          <p>
            Don't have an account? <Link to="../signup">Create account</Link>
          </p>
        </footer>
      </form>
    </>
  );
};

export default Login;
