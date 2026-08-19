import { useState } from "react";
import { Link, useNavigate } from "react-router";
import formStyles from "../styles/Forms.module.css";
import { supabase } from "../lib/supabaseClient.js";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
    };

    if (formData.email === "") {
      newErrors.email = "Can't be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate(`${import.meta.env.BASE_URL}dashboard/links`);
    }
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      signInWithEmail(formData.email, formData.password);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

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
          <h1>Reset password</h1>
          <p>
            Enter your email address and we’ll send you a link to reset your
            password
          </p>
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

          <footer
            className={`${formStyles.formFooter} ${formStyles.authFormFooter}`}
          >
            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: "100%" }}
            >
              Reset password
            </button>
            <div className={formStyles.formFooterContent}>
              <p>
                Remembered it?{" "}
                <Link to="../login" className="accent-text">
                  Login
                </Link>
              </p>
            </div>
          </footer>
        </section>
      </form>
    </>
  );
};

export default ResetPassword;
