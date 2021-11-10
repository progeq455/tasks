import { useEffect } from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Profile from "./Profile/Profile";
import s from "./Settings.module.css";

const Settings = () => {
  useEffect(() => (document.title = "Настройки"));

  return (
    <main>
      <Menu />
      <Header title="Настройки" />
      <section className={s.settingsBlock}>
        <p className={s.settingsBlock__accountText}>Аккаунт</p>
        <Profile />
      </section>
    </main>
  );
};

export default Settings;
