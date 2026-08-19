import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <section
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <h1>Home</h1>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Link to="auth/login">Login</Link>
          <Link to="auth/signup">Create Account</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
