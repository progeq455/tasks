export function createTaskOBJ(value, id) {
  return {
    title: value,
    uid: id,
  };
}

export function deleteTaskOBJ(value, id) {
  return {
    idTask: value,
    uid: id,
  };
}

export function completeTaskOBJ(value, id) {
  return {
    idTask: value,
    uid: id,
  };
}

export function unCompleteTaskOBJ(value, id) {
  return {
    idTask: value,
    uid: id,
  };
}

export function createCategoryOBJ(value, id) {
  return {
    caption: value,
    uid: id,
  };
}

export function deleteCategoryOBJ(value, id) {
  return {
    idCategory: value,
    uid: id,
  };
}

export function addTaskToCategoryOBJ(value, id, idC) {
  return {
    idTask: value,
    uid: id,
    idCategoryTo: idC,
  };
}

export function deleteTaskFromCategoryOBJ(value, id) {
  return {
    idTask: value,
    uid: id,
  };
}
