import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import UserLink from "../components/UserLink.jsx";

const Links = () => {
  const [userLinks, setUserLinks] = useLocalStorage("userLinks", []);

  const [formData, setFormData] = useState([...userLinks]);

  const addLink = (newLink) => {
    const maxItem =
      userLinks.length === 0
        ? { order: 0 }
        : userLinks.reduce((previous, current) =>
            previous.order > current.order ? previous : current,
          );
    newLink.order = maxItem.order + 1;
    setUserLinks((prev) => {
      return [...prev, newLink];
    });
    setFormData((prev) => {
      return [...prev, newLink];
    });
  };

  const removeLink = (linkId) => {
    setUserLinks((prev) => prev.filter((link) => link.id !== linkId));
    setFormData((prev) => prev.filter((link) => link.id !== linkId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserLinks([...formData]);
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    setFormData((prevData) =>
      prevData.map((link) => {
        if (link.id === id.replace(`${name}-`, "")) {
          return { ...link, [name]: value };
        }
        return link;
      }),
    );
  };

  return (
    <section className="card">
      <header>
        <h1>Customize your links</h1>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
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
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          {formData.map((link) => (
            <UserLink
              key={link.id}
              userLink={link}
              onDelete={removeLink}
              onChange={handleChange}
            ></UserLink>
          ))}

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

export default Links;
