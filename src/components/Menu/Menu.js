import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { getCategories } from "../../actions/task";
import CreateMenu from "./CreateMenu/CreateMenu";
import logoImg from "../../images/mark.png";
import allTasksImg from "../../images/allTasks.png";
import categoryImg from "../../images/category.png";
import settingsImg from "../../images/settings.png";
import menuOpenImg from "../../images/openMenu.png";
import s from "./Menu.module.css";

const Menu = () => {
  const dispatch = useDispatch();
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  useEffect(() => {
    dispatch(getCategories(user.uid));
    document.getElementById("modal").style.display = "none";
    document.getElementById("modalC").style.display = "none";
    document.getElementById("inputTask").value = "";
    document.getElementById("inputCategory").value = "";
  }, [dispatch, user.uid]);

  const categories = useSelector((state) => state.taskReducer.categories);

  const openMenu = () => {
    document.getElementById("menu").style.width = "70%";
  };

  const closeMenu = () => {
    document.getElementById("menu").style.width = "0";
  };

  return (
    <section>
      <button className={s.menu__openBtn} onClick={() => openMenu()}>
        <img
          src={menuOpenImg}
          alt="Открыть меню"
          className={s.menu__openBtn_img}
        />
      </button>
      <section className={s.menu} id="menu">
        <div className={s.closebtn} onClick={() => closeMenu()}>
          &times;
        </div>
        <Link to="/tasks" style={{ textDecoration: "none" }}>
          <img src={logoImg} alt="Tasks" className={s.menu__logoImg} />
          <p className={s.menu__logo}>Tasks</p>
        </Link>
        <CreateMenu uid={user.uid} />
        <article>
          <ul className={s.menu_links}>
            <li className={s.menu_links__liLink}>
              <img
                src={allTasksImg}
                alt="Все задачи"
                className={s.menu_links__linkImg}
              />
              <Link to="/tasks" className={s.menu_links__link}>
                Все задачи
              </Link>
            </li>
            <li className={s.menu_links__liLink}>
              <img
                src={settingsImg}
                alt="Настройки"
                className={s.menu_links__linkImg}
              />
              <Link to="/settings" className={s.menu_links__link}>
                Настройки
              </Link>
            </li>
            {categories.map((ct) =>
              ct ? (
                <li key={ct.categoryID} className={s.menu_links__liLink}>
                  <img
                    src={categoryImg}
                    alt="Категория"
                    className={s.menu_links__linkImg}
                  />
                  <Link
                    to={`/categories/${ct.categoryID}`}
                    className={s.menu_links__link}
                  >
                    {ct.categoryCaption}
                  </Link>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </article>
      </section>
    </section>
  );
};

export default Menu;
