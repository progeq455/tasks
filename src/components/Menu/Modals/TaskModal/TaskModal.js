import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../../../actions/task";
import { createTaskOBJ } from "../../../../actions/taskFunctions";
import s from "./TaskModal.module.css";

const TaskModal = (props) => {
  const dispatch = useDispatch();
  const [inInput, setInInput] = useState();

  const closeModal = () => {
    document.getElementById("modal").style.display = "none";
  };

  const newTask = () => {
    let isInput = document.getElementById("inputTask").value;
    isInput.replace(/^\s+|\s+$/g, "");
    if ((isInput !== false) & (inInput !== "")) {
      dispatch(addTask(createTaskOBJ(inInput, props.uid)));
      document.getElementById("modal").style.display = "none";
      document.getElementById("inputTask").value = "";
      setInInput("");
    } else {
      document.getElementById("inputTask").style.borderColor = "red";
    }
  };

  return (
    <div id="modal" className={s.modal}>
      <div className={s.modal_content}>
        <span className={s.close} onClick={() => closeModal()}>
          &times;
        </span>
        <p className={s.modal__textTask}>Текст задачи: </p>
        <input
          type="text"
          onChange={(e) => setInInput(e.target.value)}
          id="inputTask"
          className={s.modal__input}
          placeholder="Введите текст"
          maxLength="75"
        />
        <button onClick={() => newTask()} className={s.modal__createBtn}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
