import { Outlet } from "react-router";
import LogoLarge from "./assets/icons/logo-devlinks-large.svg";

import styles from "./Auth.module.css";

const Auth = () => {
  return (
    <div className={styles.auth}>
      <header className={styles.authHeader}>
        <img src={LogoLarge} alt="Dev Links Logo" />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
