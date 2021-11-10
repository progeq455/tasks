import { useDispatch, useSelector } from "react-redux";
import {
  addTaskToCategory,
  deleteTask,
  deleteTaskFromCategory,
} from "../../../actions/task";
import {
  addTaskToCategoryOBJ,
  deleteTaskFromCategoryOBJ,
  deleteTaskOBJ,
} from "../../../actions/taskFunctions";
import changeImg from "../../../images/more.png";
import s from "./TaskMenu.module.css";

const TaskMenu = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.taskReducer.categories);

  return (
    <div className={s.dropdown}>
      <button className={s.dropbtn}>
        <img src={changeImg} alt="Изменить" className={s.dropbtn__img} />
      </button>
      <div className={s.dropdown_content}>
        <button
          onClick={() =>
            dispatch(
              deleteTask(deleteTaskOBJ(String(props.task.taskID), props.uid))
            )
          }
          className={s.dropbtn__text}
        >
          Удалить
        </button>
        <div className={s.dropdowncategories}>
          <button className={s.dropcategoriesbtn}>Добавить в категорию</button>
          <div className={s.dropdowncategories_content}>
            {categories.length === 0 ? (
              <p className={s.dropdowncategories_content__none}>
                Созданных категорий нету
              </p>
            ) : (
              categories.map((ct) =>
                ct ? (
                  ct.categoryID === props.task.taskCategoryID ? (
                    <div className={s.dropdowncategories_content__addedText}>
                      Добавлено в категорию {ct.categoryCaption}
                    </div>
                  ) : (
                    <button
                      style={{ paddingTop: "3px", paddingBottom: "3px" }}
                      key={ct.categoryID}
                      onClick={() =>
                        dispatch(
                          addTaskToCategory(
                            addTaskToCategoryOBJ(
                              String(props.task.taskID),
                              props.uid,
                              ct.categoryID
                            )
                          )
                        )
                      }
                      className={s.dropdowncategories_content__btn}
                    >
                      Добавить в {ct.categoryCaption}
                    </button>
                  )
                ) : (
                  ""
                )
              )
            )}
          </div>
        </div>
        {categories.map((ct) =>
          ct.categoryID === props.task.taskCategoryID ? (
            <button
              key={ct.categoryID}
              onClick={() =>
                dispatch(
                  deleteTaskFromCategory(
                    deleteTaskFromCategoryOBJ(
                      String(props.task.taskID),
                      props.uid
                    )
                  )
                )
              }
              className={s.dropdowncategories_content__deleteFromCategorybtn}
            >
              Удалить из {ct.categoryCaption}
            </button>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default TaskMenu;
