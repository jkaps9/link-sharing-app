import { useState } from "react";
import { platforms } from "../data/platforms";

import styles from "../styles/UserLink.module.css";

const UserLink = ({ userLink, onDelete }) => {
  const [formData, setFormData] = useState({
    id: userLink?.id,
    order: userLink?.order,
    platform: userLink?.platform,
    url: userLink?.url,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <form>
          <section>
            <header className="row">
              <div>
                <h2>Link #{formData.order}</h2>
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
              <select
                id="platform"
                name="platform"
                className={styles.customSelect}
                onChange={handleChange}
              >
                <button>
                  <selectedcontent></selectedcontent>
                </button>
                <div className={styles.selectList}>
                  <option value="" selected={formData.platform === ""}></option>
                  {platforms.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      selected={formData.platform === p.name}
                    >
                      <img
                        src={p.iconPath}
                        alt={`${p.name} icon`}
                        width="16"
                        height="16"
                      />
                      <span>{p.name}</span>
                    </option>
                  ))}
                </div>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="url">Link</label>
              <input
                type="text"
                name="url"
                id="url"
                value={formData.url}
                onChange={handleChange}
              />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default UserLink;
