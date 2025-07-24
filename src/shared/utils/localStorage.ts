import type {
  TCategoriesList,
  TNotesList,
  TTodosList,
} from "../types/EntityTypes";

export const setNotesLS = (notes: TNotesList | null) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};
export const setTodosLS = (todos: TTodosList | null) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
export const setCategoriesLS = (categories: TCategoriesList | null) => {
  localStorage.setItem("categories", JSON.stringify(categories));
};

export const getNotesLS = () => {
  const data = localStorage.getItem("notes");
  if (!data) return null;

  const parsedData: TNotesList = JSON.parse(data);
  return parsedData;
};
export const getTodosLS = () => {
  const data = localStorage.getItem("todos");
  if (!data) return null;

  const parsedData: TTodosList = JSON.parse(data);
  return parsedData;
};
export const getCategoriesLS = () => {
  const data = localStorage.getItem("categories");
  if (!data) return null;
  const parsedData: TCategoriesList = JSON.parse(data);
  const isAllCategoryExists = parsedData.find(
    (category) => category.key === "all"
  );
  if (!isAllCategoryExists) {
    parsedData.push({ key: "all", title: "All" });
    localStorage.setItem("categories", JSON.stringify(parsedData));
  }
  return parsedData;
};
