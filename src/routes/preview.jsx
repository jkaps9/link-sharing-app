import { Link } from "react-router";
const Preview = () => {
  return (
    <>
      <header className="row">
        <button type="button" className="btn btn--secondary">
          <Link to={`${import.meta.env.BASE_URL}links`}>
            <span>Back to Editor</span>
          </Link>
        </button>
        <button type="button" className="btn btn--primary">
          <span>Share Link</span>
        </button>
      </header>
      <h1>Preview</h1>
    </>
  );
};

export default Preview;
