import { useState } from "react";
import { Link } from "react-router";
import formStyles from "../styles/Forms.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords must match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setFormData(() => ({ email: "", password: "", confirmPassword: "" }));
      alert("Account Created!");
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
            <label htmlFor="password">Create password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
              onChange={handleChange}
              value={formData.password}
              aria-describedby="password-error"
              aria-invalid={errors.password !== ""}
            />
            <p id="password-error" className={formStyles.formErrorMessage}>
              {errors.password}
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
              onChange={handleChange}
              value={formData.confirmPassword}
              aria-invalid={errors.password !== ""}
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
