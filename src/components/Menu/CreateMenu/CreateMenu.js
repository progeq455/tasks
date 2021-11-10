import CategoryModal from "../Modals/CategoryModal/CategoryModal";
import TaskModal from "../Modals/TaskModal/TaskModal";
import s from "./CreateMenu.module.css";

const CreateMenu = (props) => {
  const showModal = () => {
    document.getElementById("modal").style.display = "block";
  };

  const showModalC = () => {
    document.getElementById("modalC").style.display = "block";
  };

  return (
    <div className={s.dropdown}>
      <button className={s.dropbtn}>Создать</button>
      <div className={s.dropdown_content}>
        <button
          className={s.dropbtn__text}
          style={{ marginBottom: "8px" }}
          onClick={() => showModal()}
        >
          Новая задача
        </button>
        <TaskModal uid={props.uid} />
        <button className={s.dropbtn__text} onClick={() => showModalC()}>
          Новая категория
        </button>
        <CategoryModal uid={props.uid} />
      </div>
    </div>
  );
};

export default CreateMenu;
