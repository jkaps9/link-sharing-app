import { platforms } from "../data/platforms";
import { getPlatformIcon } from "../utils/iconLoader";
import styles from "../styles/UserLink.module.css";

const UserLink = ({ userLink, onDelete, onChange, error }) => {
  return (
    <>
      <section>
        <header className="row">
          <div>
            <h2>Link #{userLink.order}</h2>
          </div>
          <button
            type="button"
            className="btn btn--text"
            onClick={() => onDelete(userLink.id)}
          >
            Remove
          </button>
        </header>

        <div className="input-group">
          <label htmlFor={`platform-${userLink.id}`}>Platform</label>
          <select
            id={`platform-${userLink.id}`}
            name="platform"
            className={styles.customSelect}
            onChange={onChange}
          >
            <button>
              <selectedcontent></selectedcontent>
            </button>
            <div className={styles.selectList}>
              {platforms.map((p) => {
                const PlatformIcon = getPlatformIcon(p.iconFilename);
                return (
                  <option
                    key={p.id}
                    value={p.id}
                    selected={userLink.platform === p.id}
                  >
                    <PlatformIcon
                      fill="currentColor"
                      width="16"
                      height="16"
                    ></PlatformIcon>
                    <span>{p.name}</span>
                  </option>
                );
              })}
            </div>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor={`url-${userLink.id}`}>Link</label>
          <input
            type="text"
            name="url"
            id={`url-${userLink.id}`}
            value={userLink.url}
            onChange={onChange}
            aria-describedby={`linkError-${userLink.id}`}
            aria-invalid={error.message != ""}
          />
          <p id={`linkError-${userLink.id}`}>{error.message}</p>
        </div>
      </section>
    </>
  );
};

export default UserLink;
