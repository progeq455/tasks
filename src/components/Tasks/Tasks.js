import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  getTasksFromCategory,
  completeTask,
  unCompleteTask,
} from "../../actions/task";
import { setIsCategory } from "../../actions/taskActions";
import {
  completeTaskOBJ,
  unCompleteTaskOBJ,
} from "../../actions/taskFunctions";
import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import TaskMenu from "./TaskMenu/TaskMenu";
import taskCompleteImg from "../../images/completed.png";
import taskCompleteBtnImg from "../../images/noCompleted.png";
import s from "./Tasks.module.css";

const Tasks = (props) => {
  const dispatch = useDispatch();

  const idCategory = Number(props.match.params.number);

  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  let categoriesCollection;

  if (user !== null) {
    categoriesCollection = firestore
      .collection("categories")
      .where("categoryID", "==", idCategory);
  }

  const [isCategory] = useCollectionData(categoriesCollection);

  const ctName = useSelector(
    (state) => state.taskReducer.categorySelected.caption
  );

  useEffect(() => (document.title = `Категория ${ctName}`));

  const ctId = useSelector((state) => state.taskReducer.categorySelected.id);

  const isCategoryCheck = useSelector((state) => state.taskReducer.isCategory);

  if (isCategoryCheck !== true) {
    dispatch(setIsCategory());
  }

  useEffect(() => {
    if (isCategory !== undefined) {
      dispatch(getTasksFromCategory(idCategory));
    }
  }, [dispatch, idCategory, isCategory]);

  const [filtered, setFiltered] = useState([]);
  const st = useSelector((state) => state.taskReducer.tasksCategory);
  useEffect(() => setFiltered(st), [st]);

  const searchTodo = (value) => {
    let currentTasks = [];
    let newListTasks = [];

    if (value !== "") {
      currentTasks = st;
      newListTasks = currentTasks.filter((task) =>
        task.taskTitle.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      newListTasks = st;
    }
    setFiltered(newListTasks);
  };

  return (
    <main>
      {isCategoryCheck === true ? "" : <Redirect to="/tasks" />}
      <Menu />
      <Header title={ctName} id={ctId} />
      <div className={s.tasks}>
        <input
          type="text"
          placeholder="Поиск"
          onChange={(e) => searchTodo(e.target.value)}
          className={s.tasks__input}
        />
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <p className={s.tasks__none}>Задач в категории нету</p>
            <span className={s.tasks__none_span}>
              Добавьте задачи в категорию используя мини-меню (троеточие),
              которое находится рядом с каждой задачей
            </span>
          </div>
        ) : (
          ""
        )}
        {filtered.map((ts) =>
          ts ? (
            <aside key={ts.taskID} className={s.tasks__task}>
              {ts.completed & (ts.completed === true) ? (
                <img
                  src={taskCompleteImg}
                  alt="Выполнено"
                  className={s.tasks__task_imgComplete}
                  onClick={() =>
                    dispatch(
                      unCompleteTask(
                        unCompleteTaskOBJ(String(ts.taskID), user.uid)
                      )
                    )
                  }
                />
              ) : (
                <img
                  onClick={() =>
                    dispatch(
                      completeTask(completeTaskOBJ(String(ts.taskID), user.uid))
                    )
                  }
                  src={taskCompleteBtnImg}
                  alt="Выполнить"
                  className={s.tasks__task_imgComplete}
                />
              )}
              <p
                className={s.tasks__task_title}
                style={{
                  textDecoration: ts.completed ? "line-through" : "none",
                  color: ts.completed ? "darkgray" : "black",
                }}
              >
                {ts.taskTitle}
              </p>
              <TaskMenu task={ts} uid={user.uid} />
            </aside>
          ) : (
            ""
          )
        )}
        <div className={s.bottom_emptyBlock}></div>
      </div>
    </main>
  );
};

export default Tasks;
