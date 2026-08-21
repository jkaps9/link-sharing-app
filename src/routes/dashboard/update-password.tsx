import { useState } from "react";
import { useNavigate } from "react-router";
import formStyles from "../../styles/Forms.module.css";
import { supabase } from "../../lib/supabaseClient.js";
import LogoLarge from "../../assets/icons/logo-devlinks-large.svg?react";
import styles from "../../styles/Auth.module.css";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      password: "",
    };

    if (formData.password === "") {
      newErrors.password = "Check again";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Must be at least 8 characters";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords must match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Update password error:", error);
      toast.error(error.message);
    } else {
      setFormData(() => ({ password: "", confirmPassword: "" }));
      toast.success("Password has been updated");
      navigate(`${import.meta.env.BASE_URL}/dashboard/links`);
    }
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      updatePassword(formData.password);
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
    <div className={styles.auth}>
      <header className={styles.authHeader}>
        <h1>
          <span className="sr-only">devlinks</span>
          <LogoLarge aria-hidden="true" />
        </h1>
      </header>
      <main>
        <form
          className={`${formStyles.form} ${formStyles.authForm}`}
          onSubmit={handleSubmit}
        >
          <header className={formStyles.formHeader}>
            <h1>Update password</h1>
            <p>Enter a new password below</p>
          </header>

          <section
            className={`${formStyles.formSection} ${formStyles.authFormSection}`}
          >
            <div
              className={`${formStyles.formInputGroup} ${formStyles.formInputGroupColumn}`}
            >
              <label htmlFor="password">Create password</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
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
                autoComplete="new-password"
                placeholder="At least 8 characters"
                onChange={handleChange}
                value={formData.confirmPassword}
                aria-invalid={errors.password !== ""}
              />
              <p style={{ marginTop: "0.5rem" }}>
                Password must contain at least 8 characters
              </p>
            </div>
          </section>

          <footer
            className={`${formStyles.formFooter} ${formStyles.authFormFooter}`}
          >
            <button type="submit" className="btn btn--primary">
              Update password
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default UpdatePassword;
