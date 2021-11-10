import firebase from "firebase/compat/";
import { firestore } from "../firebase";
import {
  addTaskAction,
  addTaskToCategoryAction,
  completeTaskAction,
  unCompleteTaskAction,
  createCategoryAction,
  deleteCategoryAction,
  deleteTaskAction,
  deleteTaskFromCategoryAction,
  getAllTasksAction,
  getCategoriesAction,
  getCategoryAction,
  getTasksFromCategoryAction,
} from "./taskActions";

export const addTask = (value) => {
  return function (dispatch) {
    if (value.title !== undefined) {
      let id = Math.floor(Math.random() * 100000000);
      firestore.collection("tasks").doc(id.toString()).set({
        taskID: id,
        taskTitle: value.title,
        completed: false,
        taskCategoryID: "",
        taskByUser: value.uid,
        dataCreated: firebase.firestore.FieldValue.serverTimestamp(),
      });
      let docRef = firestore.collection("tasks").doc(id.toString());
      docRef.get().then((doc) => dispatch(addTaskAction(doc.data())));
    }
  };
};

export const deleteTask = (value) => {
  return function (dispatch) {
    let docRef = firestore.collection("tasks").doc(value.idTask);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const isByUser = doc.data().taskByUser;
        if (isByUser === value.uid) {
          firestore
            .collection("tasks")
            .doc(value.idTask)
            .delete()
            .then(() => dispatch(deleteTaskAction(Number(value.idTask))));
        }
      }
    });
  };
};

export const completeTask = (value) => {
  return function (dispatch) {
    let docRef = firestore.collection("tasks").doc(value.idTask);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const isByUser = doc.data().taskByUser;
        if (isByUser === value.uid) {
          firestore
            .collection("tasks")
            .doc(value.idTask)
            .update({
              completed: true,
            })
            .then(() => dispatch(completeTaskAction(Number(value.idTask))));
        }
      }
    });
  };
};

export const unCompleteTask = (value) => {
  return function (dispatch) {
    let docRef = firestore.collection("tasks").doc(value.idTask);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const isByUser = doc.data().taskByUser;
        if (isByUser === value.uid) {
          firestore
            .collection("tasks")
            .doc(value.idTask)
            .update({
              completed: false,
            })
            .then(() => dispatch(unCompleteTaskAction(Number(value.idTask))));
        }
      }
    });
  };
};

export const createCategory = (value) => {
  return function (dispatch) {
    if (value.caption !== undefined) {
      let id = Math.floor(Math.random() * 100000000);
      firestore.collection("categories").doc(id.toString()).set({
        categoryID: id,
        categoryCaption: value.caption,
        categoryByUser: value.uid,
      });
      let docRef = firestore.collection("categories").doc(id.toString());
      docRef.get().then((doc) => dispatch(createCategoryAction(doc.data())));
    }
  };
};

export const deleteCategory = (value) => {
  return function (dispatch) {
    let docRef = firestore.collection("categories").doc(value.idCategory);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const isByUser = doc.data().categoryByUser;
        if (isByUser === value.uid) {
          firestore
            .collection("categories")
            .doc(value.idCategory)
            .delete()
            .then(() =>
              dispatch(deleteCategoryAction(Number(value.idCategory)))
            );
        }
      }
    });
  };
};

export const addTaskToCategory = (value) => {
  return function (dispatch) {
    let docRef = firestore.collection("tasks").doc(value.idTask);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const isByUser = doc.data().taskByUser;
        if (isByUser === value.uid) {
          firestore
            .collection("tasks")
            .doc(value.idTask)
            .update({
              taskCategoryID: Number(value.idCategoryTo),
            })
            .then(() => dispatch(addTaskToCategoryAction(value)));
        }
      }
    });
  };
};

export const deleteTaskFromCategory = (value) => {
  return function (dispatch) {
    let docRef = firestore.collection("tasks").doc(value.idTask);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const isByUser = doc.data().taskByUser;
        if (isByUser === value.uid) {
          firestore
            .collection("tasks")
            .doc(value.idTask)
            .update({
              taskCategoryID: "",
            })
            .then(() =>
              dispatch(deleteTaskFromCategoryAction(Number(value.idTask)))
            );
        }
      }
    });
  };
};

export const getAllTasks = (value) => {
  return function (dispatch) {
    firestore
      .collection("tasks")
      .where("taskByUser", "==", value)
      .orderBy("dataCreated", "desc")
      .get()
      .then((querySnapShot) => {
        const tasks = querySnapShot.docs.map((doc) => doc.data());
        dispatch(getAllTasksAction(tasks));
      });
  };
};

export const getCategories = (value) => {
  return function (dispatch) {
    firestore
      .collection("categories")
      .where("categoryByUser", "==", value)
      .get()
      .then((querySnapShot) => {
        const categories = querySnapShot.docs.map((doc) => doc.data());
        dispatch(getCategoriesAction(categories));
      });
  };
};

export const getTasksFromCategory = (value) => {
  return function (dispatch) {
    firestore
      .collection("tasks")
      .where("taskCategoryID", "==", value)
      .get()
      .then((querySnapShot) => {
        const tasks = querySnapShot.docs.map((doc) => doc.data());
        dispatch(getTasksFromCategoryAction(tasks));
      });

    firestore
      .collection("categories")
      .where("categoryID", "==", value)
      .get()
      .then((querySnapShot) => {
        const [category] = querySnapShot.docs.map((doc) => doc.data());
        if (category !== undefined) {
          dispatch(getCategoryAction(category));
        }
      });
  };
};
