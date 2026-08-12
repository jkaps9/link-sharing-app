import { useState } from "react";
import UserLink from "../components/UserLink.jsx";

const initialState = [
  { order: 1, platform: "GitHub", url: "https://www.github.com/jkaps9" },
  {
    order: 2,
    platform: "Frontend Mentor",
    url: "https://www.frontendmentor.io/jkaps9",
  },
];
const Links = () => {
  const [userLinks, setUserLinks] = useState(initialState);
  return (
    <>
      <header>
        <h1>Customize your links</h1>
        <p>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </header>
      <section>
        <button type="button" className="btn btn--secondary">
          + Add new link
        </button>
        <ul>
          {userLinks.map((link) => {
            <li>
              {link.url}
              {/* <UserLink */}
              {/*   order={link.order} */}
              {/*   platform={link.platform} */}
              {/*   url={link.url} */}
              {/* ></UserLink> */}
            </li>;
          })}
        </ul>
      </section>
      <footer>
        <button type="button" className="btn btn--primary">
          Save
        </button>
      </footer>
    </>
  );
};

export default Links;
