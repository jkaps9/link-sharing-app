import { Link } from "react-router";

function App() {
  return (
    <>
      <Link to="login">Login</Link>
      <Link to="register">Sign Up</Link>
      <Link to="profile">View Profile</Link>
      <Link to="preview">Preview Links</Link>
    </>
  );
}

export default App;
