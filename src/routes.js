import {
  TASKS_ROUTE,
  LOGIN_ROUTE,
  SETTINGS_ROUTE,
  CATEGORY_ROUTE,
} from "./consts/consts";
import Login from "./components/Login/Login";
import Settings from "./components/Settings/Settings";
import Tasks from "./components/Tasks/Tasks";
import TasksWrapper from "./components/Tasks/TasksWrapper";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];

export const privateRoutes = [
  {
    path: TASKS_ROUTE,
    Component: TasksWrapper,
  },
  {
    path: SETTINGS_ROUTE,
    Component: Settings,
  },
  {
    path: CATEGORY_ROUTE,
    Component: Tasks,
  },
];
