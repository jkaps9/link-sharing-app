import { Outlet } from "react-router";
import LogoLarge from "../../assets/icons/logo-devlinks-large.svg?react";

import styles from "../../styles/Auth.module.css";

const Auth = () => {
  return (
    <div className={styles.auth}>
      <header className={styles.authHeader}>
        <LogoLarge />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Auth;
