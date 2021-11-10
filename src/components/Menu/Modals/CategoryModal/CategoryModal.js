import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../../actions/task";
import { createCategoryOBJ } from "../../../../actions/taskFunctions";
import s from "./CategoryModal.module.css";

const CategoryModal = (props) => {
  const dispatch = useDispatch();
  const [inInputC, setInInputC] = useState();

  const closeModalC = () => {
    document.getElementById("modalC").style.display = "none";
  };

  const newCategory = () => {
    let isInputC = document.getElementById("inputCategory").value;
    isInputC.replace(/^\s+|\s+$/g, "");
    if ((isInputC !== false) & (inInputC !== "")) {
      dispatch(createCategory(createCategoryOBJ(inInputC, props.uid)));
      document.getElementById("modalC").style.display = "none";
      document.getElementById("inputCategory").value = "";
      setInInputC("");
    } else {
      document.getElementById("inputCategory").style.borderColor = "red";
    }
  };

  return (
    <div id="modalC" className={s.modal}>
      <div className={s.modal_content}>
        <span className={s.close} onClick={() => closeModalC()}>
          &times;
        </span>
        <p className={s.modal__textTask}>Название категории: </p>
        <input
          type="text"
          onChange={(e) => setInInputC(e.target.value)}
          id="inputCategory"
          className={s.modal__input}
          placeholder="Введите текст"
          maxLength="50"
        />
        <button onClick={() => newCategory()} className={s.modal__createBtn}>
          Создать категорию
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
