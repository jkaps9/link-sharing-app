import { useState } from "react";
import { Link, useNavigate } from "react-router";
import formStyles from "../../styles/Forms.module.css";
import { supabase } from "../../lib/supabaseClient.js";
import { toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

  async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(error.message);
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
              type="email"
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
            <div className={formStyles.formFooterContent}>
              <Link to="../reset-password" className="accent-text">
                Forgot password?
              </Link>
              <p>
                Don't have an account?{" "}
                <Link to="../signup" className="accent-text">
                  Sign up
                </Link>
              </p>
            </div>
          </footer>
        </section>
      </form>
    </>
  );
};

export default Login;
