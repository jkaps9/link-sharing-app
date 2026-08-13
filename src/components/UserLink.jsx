const platforms = [
  "GitHub",
  "YouTube",
  "Twitter",
  "LinkedIn",
  "Frontend Mentor",
];
const UserLink = ({ userLink, onDelete }) => {
  return (
    <>
      <div>
        <form>
          <section>
            <header className="row">
              <div>
                <h2>Link #{userLink?.order}</h2>
              </div>
              <button
                type="button"
                className="btn btn--text"
                onClick={onDelete}
              >
                Remove
              </button>
            </header>

            <div className="input-group">
              <label htmlFor="platform">Platform</label>
              <select id="platform" name="platform">
                <option value="" selected={userLink.platform === ""}></option>
                {platforms.map((p) => (
                  <option
                    value={p.toLowerCase().replace(" ", "_")}
                    selected={userLink.platform === p}
                  >
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="url">Link</label>
              <input type="text" name="url" id="url" value={userLink?.url} />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default UserLink;
