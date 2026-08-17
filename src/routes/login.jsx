import { Link } from "react-router";
import formStyles from "../styles/Forms.module.css";

const Login = () => {
  return (
    <>
      <form className={`${formStyles.form} ${formStyles.authForm}`}>
        <header className={formStyles.formHeader}>
          <h1>Login</h1>
          <p>Add your details below to get back into the app</p>
        </header>

        <section
          className={`${formStyles.formSection} ${formStyles.authFormSection}`}
        >
          <div
            className={`${formStyles.formInputGroup} ${formStyles.formInputGroupColumn}`}
          >
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="e.g. alex@email.com"
            />
            <p id="email-error" className={formStyles.formErrorMessage}>
              Can't be empty
            </p>
          </div>
          <div
            className={`${formStyles.formInputGroup} ${formStyles.formInputGroupColumn}`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <p id="password-error" className={formStyles.formErrorMessage}>
              Please check again
            </p>
          </div>

          <footer
            className={`${formStyles.formFooter} ${formStyles.authFormFooter}`}
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: "100%" }}
            >
              Login
            </button>
            <div className="footer__content">
              <p>Don't have an account? </p>
              <Link to="../signup" className="accent-text">
                Create account
              </Link>
            </div>
          </footer>
        </section>
      </form>
    </>
  );
};

export default Login;
