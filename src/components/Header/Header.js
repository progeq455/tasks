import { useContext } from "react";
import { Context } from "../..";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteCategory } from "../../actions/task";
import deleteImg from "../../images/delete.png";
import s from "./Header.module.css";
import { deleteCategoryOBJ } from "../../actions/taskFunctions";

const Header = (props) => {
  let title = props.title;
  let id = props.id;

  if (!title) {
    title = "Задачи";
  }

  if (!id) {
    id = "";
  }

  const dispatch = useDispatch();
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <section>
      <div className={s.header}>{title}</div>
      {id !== "" ? (
        <button
          className={s.header_deleteButton}
          onClick={() =>
            dispatch(deleteCategory(deleteCategoryOBJ(String(id), user.uid)))
          }
        >
          <img
            src={deleteImg}
            alt="Удалить категорию"
            className={s.header_deleteButton__deleteImg}
          />
        </button>
      ) : (
        ""
      )}
    </section>
  );
};

export default Header;
