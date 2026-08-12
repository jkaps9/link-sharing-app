const Links = () => {
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
