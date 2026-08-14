import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const Profile = () => {
  const [profileData, setProfileData] = useLocalStorage("profileData", {});

  const [formData, setFormData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const validateForm = () => {
    let isValid = true;

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setProfileData(formData);
      alert("Saved");
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
    <section className="card">
      <header>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile</p>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <section>
            <label for="avatar">Profile picture</label>

            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
            />

            <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
          </section>
          <section>
            <div class="input-group">
              <label for="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div class="input-group">
              <label for="lastName">Last Name</label>
              <input
                name="lastName"
                id="lastName"
                type="text"
                placeholder="e.g. Appleseed"
                value={formData.lastName}
                required
                onChange={handleChange}
              />
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                autocomplete="off"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </section>
          <footer>
            <button type="submit" className="btn btn--primary">
              Save
            </button>
          </footer>
        </form>
      </section>
    </section>
  );
};

export default Profile;
