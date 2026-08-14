const Profile = () => {
  return (
    <section className="card">
      <header>
        <h1>Profile Details</h1>
        <p>Add your details to create a personal touch to your profile</p>
      </header>
      <section>
        <form>
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
                autocomplete="given-name"
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
                autocomplete="family-name"
                required
              />
            </div>
            <div class="input-group">
              <label for="email">Email</label>
              <input name="email" id="email" type="email" autocomplete="off" />
            </div>
          </section>
        </form>
      </section>

      <footer>
        <button type="button" className="btn btn--primary">
          Save
        </button>
      </footer>
    </section>
  );
};

export default Profile;
