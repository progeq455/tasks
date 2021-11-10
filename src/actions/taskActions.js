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

export const addTaskAction = (value) => ({ type: ADD_TASK, value });
export const deleteTaskAction = (value) => ({ type: DELETE_TASK, value });
export const completeTaskAction = (value) => ({ type: COMPLETE_TASK, value });
export const unCompleteTaskAction = (value) => ({
  type: UNCOMPLETE_TASK,
  value,
});
export const createCategoryAction = (value) => ({
  type: CREATE_CATEGORY,
  value,
});
export const deleteCategoryAction = (value) => ({
  type: DELETE_CATEGORY,
  value,
});
export const addTaskToCategoryAction = (value) => ({
  type: ADD_TASK_TO_CATEGORY,
  value,
});
export const deleteTaskFromCategoryAction = (value) => ({
  type: DELETE_TASK_FROM_CATEGORY,
  value,
});
export const getAllTasksAction = (value) => ({ type: GET_ALL_TASKS, value });
export const getCategoriesAction = (value) => ({ type: GET_CATEGORIES, value });
export const getTasksFromCategoryAction = (value) => ({
  type: GET_TASKS_FROM_CATEGORY,
  value,
});
export const getCategoryAction = (value) => ({
  type: GET_CATEGORY,
  value,
});
export const setIsCategory = () => ({ type: SET_IS_CATEGORY });
