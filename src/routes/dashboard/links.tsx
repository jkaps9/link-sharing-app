import { useState } from "react";
import { useOutletContext } from "react-router";
import type { OutletContextType, UserLink } from "../../types.js";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";

import UserLinkComponent from "../../components/UserLink.js";
import PhoneMockup from "../../components/PhoneMockup.js";
import styles from "../../styles/Forms.module.css";

interface SortableProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

function Sortable({ id, index, children }: SortableProps) {
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

  const { userLinks, updateLinks, profileData } =
    useOutletContext<OutletContextType>();

  const [formData, setFormData] = useState([...userLinks]);

  const [errors, setErrors] = useState(
    formData.map((link) => {
      return { id: link.id, message: "" };
    }),
  );

  const addLink = (newLink: UserLink) => {
    const maxItem =
      formData.length === 0
        ? { sort_order: 0 }
        : formData.reduce((previous, current) =>
            previous.sort_order > current.sort_order ? previous : current,
          );
    newLink.sort_order = maxItem.sort_order + 1;
    setFormData((prev) => {
      return [...prev, newLink];
    });
    setErrors((prev) => {
      return [...prev, { id: newLink.id, message: "" }];
    });
  };

  const removeLink = (linkId: string) => {
    setFormData((prev) => {
      const updatedArray = prev.filter((link) => link.id !== linkId);

      return updatedArray.map((link, index) => {
        return {
          ...link,
          sort_order: index + 1,
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
            newErrors[index]!.message = "Can't be empty";
          }
        });
        isValid = false;
      } else if (!link.url.match(urlRegex)) {
        newErrors.forEach((error, index) => {
          if (error.id === link.id) {
            newErrors[index]!.message = "Invalid URL structure";
          }
        });
        isValid = false;
      } else if (!link.url.includes(link.platform)) {
        newErrors.forEach((error, index) => {
          if (error.id === link.id) {
            newErrors[index]!.message = "URL not valid for platform";
          }
        });
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      updateLinks([...formData]);
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value, id } = event.target;

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
      <section className="card hide-on-mobile preview-card">
        <PhoneMockup
          userLinks={formData}
          profileData={profileData}
        ></PhoneMockup>
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
                sort_order: 0,
                platform: "github",
                url: "",
              })
            }
          >
            + Add new link
          </button>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formContainer}>
              <DragDropProvider
                onDragEnd={(event) => {
                  if (event.canceled) return;
                  setFormData((prev) => {
                    const movedArray = move(prev, event);
                    return movedArray.map((link, index) => {
                      return {
                        ...link,
                        sort_order: index + 1,
                      };
                    });
                  });
                }}
              >
                {formData.map((link) => (
                  <Sortable key={link.id} id={link.id} index={link.sort_order}>
                    <UserLinkComponent
                      key={link.id}
                      userLink={link}
                      onDelete={removeLink}
                      onChange={handleChange}
                      error={errors.filter((error) => error.id === link.id)[0]}
                    ></UserLinkComponent>
                  </Sortable>
                ))}
              </DragDropProvider>
            </div>
            <footer className={styles.formFooter}>
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
