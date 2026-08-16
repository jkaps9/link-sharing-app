import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";

import UserLink from "../components/UserLink.jsx";
import PhoneMockup from "../components/PhoneMockup.jsx";

function Sortable({ id, index, children }) {
  const { ref } = useSortable({ id, index });

  return (
    <div ref={ref} className="item">
      {children}
    </div>
  );
}

const Links = () => {
  const urlRegex =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/g;

  const [userLinks, setUserLinks] = useLocalStorage("userLinks", []);

  const [formData, setFormData] = useState([...userLinks]);

  const [errors, setErrors] = useState(
    formData.map((link) => {
      return { id: link.id, message: "" };
    }),
  );

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
    setErrors((prev) => {
      return [...prev, { id: newLink.id, message: "" }];
    });
  };

  const removeLink = (linkId) => {
    setFormData((prev) => {
      const updatedArray = prev.filter((link) => link.id !== linkId);

      return updatedArray.map((link, index) => {
        return {
          ...link,
          order: index + 1,
        };
      });
    });
    setErrors((prev) => prev.filter((link) => link.id !== linkId));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = formData.map((link) => {
      return { id: link.id, message: "" };
    });

    formData.map((link) => {
      if (link.url === "") {
        newErrors.forEach((error, index) => {
          if (error.id === link.id) {
            newErrors[index].message = "Can't be empty";
          }
        });
        isValid = false;
      } else if (!link.url.match(urlRegex)) {
        newErrors.forEach((error, index) => {
          if (error.id === link.id) {
            newErrors[index].message = "Please check the URL";
          }
        });
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUserLinks([...formData]);
      alert("Saved");
    }
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
    <>
      <section
        className="card hide-on-mobile"
        style={{
          display: "grid",
          placeContent: "center",
          width: "40%",
        }}
      >
        <PhoneMockup userLinks={formData}></PhoneMockup>
      </section>
      <section className="card" style={{ flex: "1" }}>
        <header>
          <h1>Customize your links</h1>
          <p>
            Add/edit/remove links below and then share all your profiles with
            the world!
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
                platform: "github",
                url: "",
              })
            }
          >
            + Add new link
          </button>
          <form onSubmit={handleSubmit}>
            <DragDropProvider
              onDragEnd={(event) => {
                if (event.canceled) return;
                setFormData((prev) => {
                  const movedArray = move(prev, event);
                  return movedArray.map((link, index) => {
                    return {
                      ...link,
                      order: index + 1,
                    };
                  });
                });
              }}
            >
              {formData.map((link) => (
                <Sortable key={link.id} id={link.id} index={link.order}>
                  <UserLink
                    key={link.id}
                    userLink={link}
                    onDelete={removeLink}
                    onChange={handleChange}
                    error={errors.filter((error) => error.id === link.id)[0]}
                  ></UserLink>
                </Sortable>
              ))}
            </DragDropProvider>
            <footer>
              <button type="submit" className="btn btn--primary">
                Save
              </button>
            </footer>
          </form>
        </section>
      </section>
    </>
  );
};

export default Links;
