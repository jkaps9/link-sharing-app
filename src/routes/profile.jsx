import { useState } from "react";
import { useOutletContext } from "react-router";
import PhoneMockup from "../components/PhoneMockup.jsx";

import ImageIcon from "../assets/icons/icon-upload-image.svg?react";
import styles from "../styles/Profile.module.css";
import formStyles from "../styles/Forms.module.css";

const Profile = () => {
  const { userLinks, profileData, updateProfile } = useOutletContext();

  const [formData, setFormData] = useState({
    avatar: profileData?.avatar || null,
    firstName: profileData?.first_name || "",
    lastName: profileData?.last_name || "",
    email: profileData?.email || "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
    };

    if (formData.firstName === "") {
      newErrors.firstName = "Can't be empty";
      isValid = false;
    }

    if (formData.lastName === "") {
      newErrors.lastName = "Can't be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateProfile(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let parsedValue = value;

    if (files) {
      const file = files[0];
      if (file.size > 2097152) {
        alert("file is too large");
        return;
      }

      const reader = new FileReader();
      let base64String = "";
      reader.onload = function () {
        base64String = reader.result;
        parsedValue = base64String;
        setFormData((prev) => ({
          ...prev,
          [name]: parsedValue,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));
    }
  };

  return (
    <>
      <section className="card hide-on-mobile preview-card">
        <PhoneMockup userLinks={userLinks} profileData={formData}></PhoneMockup>
      </section>
      <section className="card">
        <header>
          <h1>Profile Details</h1>
          <p>Add your details to create a personal touch to your profile</p>
        </header>
        <section>
          <form onSubmit={handleSubmit} className={formStyles.form}>
            <section className={formStyles.formSection}>
              <div className={formStyles.formInputGroup}>
                <p>Profile picture</p>
                <div className={styles.avatarInput}>
                  <label htmlFor="avatar" style={{ width: "fit-content" }}>
                    <div
                      className={`${styles.avatarLabel}`}
                      style={{
                        backgroundImage: formData.avatar
                          ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${formData.avatar})`
                          : "none",
                        color: `${
                          formData.avatar
                            ? "var(--colors-white)"
                            : "var(--color-primary)"
                        }`,
                      }}
                    >
                      <ImageIcon height="40" width="40"></ImageIcon>
                      <span>
                        {formData.avatar ? "Change Image" : "+ Upload Image"}
                      </span>
                    </div>
                  </label>

                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleChange}
                    accept="image/png, image/jpeg"
                    className="sr-only"
                  />
                  <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
                </div>
              </div>
            </section>
            <section className={formStyles.formSection}>
              <div className={formStyles.formInputGroup}>
                <label htmlFor="firstName">First name*</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={handleChange}
                  aria-describedby="fn-error-message"
                  aria-invalid={errors.firstName !== ""}
                />
                <p
                  id="fn-error-message"
                  className={formStyles.formErrorMessage}
                >
                  {errors.firstName}
                </p>
              </div>
              <div className={formStyles.formInputGroup}>
                <label htmlFor="lastName">Last Name*</label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="e.g. Appleseed"
                  value={formData.lastName}
                  onChange={handleChange}
                  aria-describedby="ln-error-message"
                  aria-invalid={errors.lastName !== ""}
                />
                <p
                  id="ln-error-message"
                  className={formStyles.formErrorMessage}
                >
                  {errors.lastName}
                </p>
              </div>
              <div className={formStyles.formInputGroup}>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </section>
            <footer className={formStyles.formFooter}>
              <button type="submit" className="btn btn--primary">
                Save
              </button>
            </footer>
          </form>
        </section>
      </section>
    </>
  );
};

export default Profile;
