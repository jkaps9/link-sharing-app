import { Link } from "react-router";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <header>
        <nav className={styles.navList}>
          <Link to="profile">View Profile</Link>
          <Link to="preview">Preview Links</Link>
        </nav>
      </header>
      <main></main>
    </>
  );
}

export default App;
