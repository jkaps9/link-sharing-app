import { useLocalStorage } from "../hooks/useLocalStorage.js";
import UserLink from "../components/UserLink.jsx";

const Links = () => {
  const [userLinks, setUserLinks] = useLocalStorage("userLinks", []);

  const addLink = (newLink) => {
    setUserLinks((prev) => {
      const maxItem =
        prev.length === 0
          ? { order: 0 }
          : prev.reduce((previous, current) =>
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
        <form>
          {userLinks.map((link) => (
            <UserLink
              key={link.id}
              userLink={link}
              onDelete={() => removeLink(link.id)}
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
