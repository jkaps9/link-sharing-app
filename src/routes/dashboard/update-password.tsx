import { useState } from "react";
import formStyles from "../../styles/Forms.module.css";
import { supabase } from "../../lib/supabaseClient.js";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      password: "",
    };

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

  async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Update password error:", error);
      alert(error.message);
    } else {
      setFormData(() => ({ password: "", confirmPassword: "" }));
      alert("Password has been updated");
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
    <>
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
    </>
  );
};

export default UpdatePassword;
