import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const Profile = () => {
  const [profileData, setProfileData] = useLocalStorage("profileData", {});

  const [formData, setFormData] = useState({
    avatar: profileData.avatar,
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
  });

  const [errors, setErrors] = useState({
    avatar: "",
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
    <section className="card">
      <header>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile</p>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <section>
            <label for="avatar">Profile picture</label>

            <img src={`${formData.avatar}`} alt="" />
            {/* <p>{`data:image/png;base64,${profileData.avatar}`}</p> */}
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleChange}
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
