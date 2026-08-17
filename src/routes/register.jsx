import { Link } from "react-router";
import formStyles from "../styles/Forms.module.css";

const Register = () => {
  return (
    <>
      <form className={`${formStyles.form} ${formStyles.authForm}`}>
        <header className={formStyles.formHeader}>
          <h1>Create account</h1>
          <p>Let’s get you started sharing your links!</p>
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
            <label htmlFor="password">Create password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
            />
            <p id="password-error" className={formStyles.formErrorMessage}>
              Please check again
            </p>
          </div>
          <div
            className={`${formStyles.formInputGroup} ${formStyles.formInputGroupColumn}`}
          >
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="At least 8 characters"
            />
            <p>Password must contain at least 8 characters</p>
          </div>
        </section>

        <footer
          className={`${formStyles.formFooter} ${formStyles.authFormFooter}`}
        >
          <button type="submit" className="btn btn--primary">
            Create new account
          </button>
          <div>
            <p>Already have an account?</p>
            <Link to="../login" className="accent-text">
              Login
            </Link>
          </div>
        </footer>
      </form>
    </>
  );
};

export default Register;
