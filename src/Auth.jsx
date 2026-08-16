import { Outlet } from "react-router";
import LogoLarge from "./assets/icons/logo-devlinks-large.svg";

const Auth = () => {
  return (
    <>
      <header>
        <img src={LogoLarge} alt="Dev Links Logo" />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Auth;
