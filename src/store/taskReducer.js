import {
  ADD_TASK,
  DELETE_TASK,
  COMPLETE_TASK,
  UNCOMPLETE_TASK,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_TASK_TO_CATEGORY,
  DELETE_TASK_FROM_CATEGORY,
  GET_ALL_TASKS,
  GET_CATEGORIES,
  GET_TASKS_FROM_CATEGORY,
  GET_CATEGORY,
  SET_IS_CATEGORY,
} from "../consts/consts";

const initialState = {
  tasks: [],
  tasksCategory: [],
  categories: [],
  categorySelected: {},
  isCategory: "",
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.value],
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.taskID !== action.value)],
        tasksCategory: [
          ...state.tasksCategory.filter((task) => task.taskID !== action.value),
        ],
      };

    case COMPLETE_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.taskID === action.value
              ? { ...task, completed: !task.completed }
              : task
          ),
        ],
        tasksCategory: [
          ...state.tasksCategory.map((task) =>
            task.taskID === action.value
              ? { ...task, completed: !task.completed }
              : task
          ),
        ],
      };

    case UNCOMPLETE_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.taskID === action.value ? { ...task, completed: false } : task
          ),
        ],
        tasksCategory: [
          ...state.tasksCategory.map((task) =>
            task.taskID === action.value ? { ...task, completed: false } : task
          ),
        ],
      };

    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.value],
      };

    case DELETE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories.filter(
            (category) => category.categoryID !== action.value
          ),
        ],
        categorySelected: {},
        isCategory: "",
        tasks: [
          ...state.tasks.map((task) =>
            task.taskCategoryID === action.value
              ? { ...task, taskCategoryID: "" }
              : task
          ),
        ],
      };

    case ADD_TASK_TO_CATEGORY:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.taskID === Number(action.value.idTask)
              ? { ...task, taskCategoryID: Number(action.value.idCategoryTo) }
              : task
          ),
        ],
        tasksCategory: [
          ...state.tasksCategory.filter(
            (task) => task.taskID !== Number(action.value.idTask)
          ),
        ],
      };

    case DELETE_TASK_FROM_CATEGORY:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.taskID === action.value
              ? { ...task, taskCategoryID: "" }
              : task
          ),
        ],
        tasksCategory: [
          ...state.tasksCategory.filter((task) => task.taskID !== action.value),
        ],
      };

    case GET_ALL_TASKS:
      return {
        ...state,
        categorySelected: {
          id: "",
          caption: "Все задачи",
        },
        isCategory: true,
        tasks: action.value,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.value,
      };

    case GET_TASKS_FROM_CATEGORY:
      return {
        ...state,
        tasksCategory: action.value,
      };

    case GET_CATEGORY:
      return {
        ...state,
        categorySelected: {
          id: action.value.categoryID,
          caption: action.value.categoryCaption,
        },
        isCategory: true,
      };

    case SET_IS_CATEGORY:
      return {
        ...state,
        isCategory: "",
      };

    default:
      return state;
  }
};
