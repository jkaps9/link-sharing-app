import { Outlet } from "react-router";
import LogoLarge from "../../assets/icons/logo-devlinks-large.svg?react";

import styles from "../../styles/Auth.module.css";

const Auth = () => {
  return (
    <div className={styles.auth}>
      <header className={styles.authHeader}>
        <h1>
          <span className="sr-only">devlinks</span>
          <LogoLarge aria-hidden="true" />
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
