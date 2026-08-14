import { NavLink } from "react-router";
const Preview = () => {
  return (
    <>
      <header>
        <nav>
          <button type="button" classNamr="btn btn--primary">
            <NavLink to={`${import.meta.env.BASE_URL}links`}>
              <span>Back to Editor</span>
            </NavLink>
          </button>
        </nav>
      </header>
      <h1>Preview</h1>
    </>
  );
};

export default Preview;
