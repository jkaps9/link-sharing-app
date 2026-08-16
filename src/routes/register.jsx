import { Link } from "react-router";

const Register = () => {
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
          <label htmlFor="password">Create password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="At least 8 characters"
          />
          <p id="password-error" className="error-message">
            Please check again
          </p>
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="At least 8 characters"
          />
          <p id="confirm-password-error" className="error-message">
            Please check again
          </p>
        </div>

        <footer>
          <button type="submit">Create new account</button>
          <p>
            Already have an account? <Link to="../login">Login</Link>
          </p>
        </footer>
      </form>
    </>
  );
};

export default Register;
