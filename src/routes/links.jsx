import { useState } from "react";
import UserLink from "../components/UserLink.jsx";

const initialState = [
  {
    id: crypto.randomUUID(),
    order: 1,
    platform: "GitHub",
    url: "https://www.github.com/jkaps9",
  },
  {
    id: crypto.randomUUID(),
    order: 2,
    platform: "Frontend Mentor",
    url: "https://www.frontendmentor.io/jkaps9",
  },
];
const Links = () => {
  const [userLinks, setUserLinks] = useState(initialState);

  const addLink = (newLink) => {
    setUserLinks((prev) => {
      const maxItem = prev.reduce((previous, current) =>
        previous.order > current.order ? previous : current,
      );
      newLink.order = maxItem.order + 1;
      return [...prev, newLink];
    });
  };

  const removeLink = (linkId) => {
    setUserLinks((prev) => prev.filter((link) => link.id !== linkId));
  };

  return (
    <section className="card">
      <header>
        <h1>Customize your links</h1>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </header>
      <section>
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() =>
            addLink({
              id: crypto.randomUUID(),
              order: 0,
              platform: "",
              url: "",
            })
          }
        >
          + Add new link
        </button>
        <ul>
          {userLinks.map((link) => (
            <li key={link.id}>
              <UserLink
                userLink={link}
                onDelete={() => removeLink(link.id)}
              ></UserLink>
            </li>
          ))}
        </ul>
      </section>
      <footer>
        <button type="button" className="btn btn--primary">
          Save
        </button>
      </footer>
    </section>
  );
};

export default Links;
