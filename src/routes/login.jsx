import { useState } from "react";
import { Link } from "react-router";
import formStyles from "../styles/Forms.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (formData.email === "") {
      newErrors.email = "Can't be empty";
      isValid = false;
    }

    if (formData.password === "") {
      newErrors.password = "Check again";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormData(() => ({ email: "", password: "" }));
      alert("Logged In!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        className={`${formStyles.form} ${formStyles.authForm}`}
        onSubmit={handleSubmit}
      >
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
              onChange={handleChange}
              value={formData.email}
              aria-describedby="email-error"
              aria-invalid={errors.email !== ""}
            />
            <p id="email-error" className={formStyles.formErrorMessage}>
              {errors.email}
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
              onChange={handleChange}
              value={formData.password}
              aria-describedby="password-error"
              aria-invalid={errors.password !== ""}
            />
            <p id="password-error" className={formStyles.formErrorMessage}>
              {errors.password}
            </p>
          </div>

          <footer
            className={`${formStyles.formFooter} ${formStyles.authFormFooter}`}
          >
            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: "100%" }}
            >
              Login
            </button>
            <div>
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
