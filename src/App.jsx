import { Link } from "react-router";
import styles from "./App.module.css";
import LogoLarge from "./assets/icons/logo-devlinks-large.svg";
import LogoSmall from "./assets/icons/logo-devlinks-small.svg";

function App() {
  return (
    <>
      <header>
        <img
          src={LogoLarge}
          alt="Dev Links Logo"
          className={styles.logoLarge}
        />
        <img
          src={LogoSmall}
          alt="Dev Links Logo"
          className={styles.logoSmall}
        />
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
