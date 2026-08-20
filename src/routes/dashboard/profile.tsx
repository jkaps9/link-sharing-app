import { useState } from "react";
import { useOutletContext } from "react-router";
import type { OutletContextType } from "../../types.js";
import PhoneMockup from "../../components/PhoneMockup.js";

import ImageIcon from "../../assets/icons/icon-upload-image.svg?react";
import styles from "../../styles/Profile.module.css";
import formStyles from "../../styles/Forms.module.css";

const Profile = () => {
  const { userLinks, profileData, updateProfile } =
    useOutletContext<OutletContextType>();

  const [formData, setFormData] = useState({
    avatar: profileData?.avatar || null,
    first_name: profileData?.first_name || "",
    last_name: profileData?.last_name || "",
    email: profileData?.email || "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      first_name: "",
      last_name: "",
    };

    if (formData.first_name === "") {
      newErrors.first_name = "Can't be empty";
      isValid = false;
    }

    if (formData.last_name === "") {
      newErrors.last_name = "Can't be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      updateProfile(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    let parsedValue = value;

    if (files) {
      const file = files[0];
      if (file) {
        if (file.size > 2097152) {
          alert("file is too large");
          return;
        }

        const reader = new FileReader();
        let base64String = "";
        reader.onload = function () {
          base64String = reader.result as string;
          parsedValue = base64String;
          setFormData((prev) => ({
            ...prev,
            [name]: parsedValue,
          }));
        };

        reader.readAsDataURL(file);
      }
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
                <label htmlFor="first_name">First name*</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="e.g. John"
                  value={formData.first_name}
                  onChange={handleChange}
                  aria-describedby="fn-error-message"
                  aria-invalid={errors.first_name !== ""}
                />
                <p
                  id="fn-error-message"
                  className={formStyles.formErrorMessage}
                >
                  {errors.first_name}
                </p>
              </div>
              <div className={formStyles.formInputGroup}>
                <label htmlFor="last_name">Last Name*</label>
                <input
                  name="last_name"
                  id="last_name"
                  type="text"
                  placeholder="e.g. Appleseed"
                  value={formData.last_name}
                  onChange={handleChange}
                  aria-describedby="ln-error-message"
                  aria-invalid={errors.last_name !== ""}
                />
                <p
                  id="ln-error-message"
                  className={formStyles.formErrorMessage}
                >
                  {errors.last_name}
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
