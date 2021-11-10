import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { completeTask, getAllTasks, unCompleteTask } from "../../actions/task";
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
import "../../App.css";
import { Link } from "react-router-dom";

const TasksWrapper = () => {
  useEffect(() => (document.title = "Все задачи"));

  const dispatch = useDispatch();

  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  const st = useSelector((state) => state.taskReducer.tasks);
  const categories = useSelector((state) => state.taskReducer.categories);

  const [filtered, setFiltered] = useState([]);
  useEffect(() => setFiltered(st), [st]);
  useEffect(() => {
    if (user) {
      dispatch(getAllTasks(user.uid));
    }
  }, [dispatch, user]);

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
      <Menu />
      <Header title="Все задачи" />
      <div className={s.tasks}>
        <input
          type="text"
          placeholder="Поиск"
          onChange={(e) => searchTodo(e.target.value)}
          className={s.tasks__input}
        />
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <p className={s.tasks__none}>Задач нету</p>
            <span className={s.tasks__none_span}>
              Создайте новую используя кнопку в меню
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
              {categories.map((ct) =>
                ct ? (
                  ts.taskCategoryID === ct.categoryID ? (
                    <div style={{ clear: "both" }}>
                      <Link
                        to={`/categories/${ct.categoryID}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p className={s.tasks__task__category}>
                          {ct.categoryCaption}
                        </p>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )
              )}
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

export default TasksWrapper;
