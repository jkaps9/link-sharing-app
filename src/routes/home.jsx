import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to="login">Login</Link>
      <Link to="register">Sign Up</Link>
    </>
  );
};

export default Home;
