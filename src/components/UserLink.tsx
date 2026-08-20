import { platforms } from "../data/platforms.js";
import { getPlatformIcon } from "../utils/iconLoader.js";
import type { ProfileData, UserLink } from "../types.js";
import styles from "../styles/UserLink.module.css";
import formStyles from "../styles/Forms.module.css";
import DragAndDropIcon from "../assets/icons/icon-drag-and-drop.svg?react";
import LinkIcon from "../assets/icons/icon-link.svg?react";

interface UserLinkProps {
  userLink: UserLink;
  onDelete: (linkId: string) => void;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  error: { id: string; message: string } | undefined;
}

const UserLinkComponent = ({
  userLink,
  onDelete,
  onChange,
  error,
}: UserLinkProps) => {
  return (
    <>
      <section className={formStyles.formSection}>
        <header className="row">
          <div className={styles.cardHeaderLeft}>
            <DragAndDropIcon></DragAndDropIcon>
            <h2>Link #{userLink.sort_order}</h2>
          </div>
          <button
            type="button"
            className="btn btn--text"
            onClick={() => onDelete(userLink.id)}
          >
            Remove
          </button>
        </header>

        <div
          className={`${formStyles.formInputGroup} ${formStyles.formInputGroupColumn}`}
        >
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
        <div
          className={`${formStyles.formInputGroup} ${formStyles.formInputGroupColumn}`}
        >
          <label htmlFor={`url-${userLink.id}`}>Link</label>
          <div className={formStyles.inputContainer}>
            <LinkIcon className={formStyles.inputIcon}></LinkIcon>
            <input
              type="text"
              name="url"
              id={`url-${userLink.id}`}
              value={userLink.url}
              onChange={onChange}
              aria-describedby={`linkError-${userLink.id}`}
              aria-invalid={error && error.message !== ""}
            />
          </div>
          <p
            id={`linkError-${userLink.id}`}
            className={formStyles.formErrorMessage}
          >
            {error && error.message}
          </p>
        </div>
      </section>
    </>
  );
};

export default UserLinkComponent;
