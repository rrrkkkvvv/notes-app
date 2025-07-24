import { createSlice } from "../../../app/store/lib/createSlice";
import type { TAction } from "../../../app/store/lib/types";
import { getState, type AppThunk } from "../../../app/store/store";
import type {
  TCategoriesList,
  TCategory,
} from "../../../shared/types/EntityTypes";
import {
  getCategoriesLS,
  setCategoriesLS,
} from "../../../shared/utils/localStorage";
import { resetCategoryForNotes } from "../../Note/model/noteSlice";
type TInitialState = {
  categories: TCategoriesList | null;
};
let categoriesLS = getCategoriesLS();
const initialState: TInitialState = {
  categories: categoriesLS
    ? categoriesLS
    : [
        {
          key: "all",
          title: "All",
        },
      ],
};

const categoriesSlice = createSlice({
  name: "categoriesState",
  initialState,
  reducers: {
    setCategories: (
      state,
      action: TAction<"SET_CATEGORIES", TCategoriesList>
    ) => ({
      ...state,
      categories: action.payload,
    }),
  },
  selectors: {
    selectCategories: (state) => state.categories,
  },
});

export const selectCategoryByKey = (key: string) => {
  const categories = getState().categoriesState.categories;
  const wantedCategory = categories?.find((category) => category.key === key);
  return wantedCategory ? wantedCategory : null;
};
export const removeCategory =
  (categoryKey: string): AppThunk =>
  async (dispatch, getState) => {
    const categories = getState().categoriesState.categories;
    if (!categories) return;

    let newCategoriesList = categories.filter(
      (category: TCategory) => category.key !== categoryKey
    );
    resetCategoryForNotes(categoryKey)(dispatch, getState);

    dispatch(setCategories(newCategoriesList));

    setCategoriesLS(newCategoriesList);
  };
export const addCategory =
  (categoryTitle: string): AppThunk =>
  async (dispatch, getState) => {
    if (!categoryTitle.trim().length) return;
    const categoryKey = categoryTitle.toLowerCase();

    const categories = getState().categoriesState.categories;

    let newCategoriesList = categories ? [...categories] : categories;

    let newCategory = { key: categoryKey, title: categoryTitle };
    if (newCategoriesList) {
      const isCategoryExists = newCategoriesList.find(
        (category) => category.key === categoryKey
      );
      if (!!isCategoryExists) return;
      newCategoriesList?.push(newCategory);
    } else {
      newCategoriesList = [newCategory];
    }

    dispatch(setCategories(newCategoriesList));

    setCategoriesLS(newCategoriesList);
  };
export const { setCategories, setCurrentCategory } = categoriesSlice.actions;
export const { selectCategories } = categoriesSlice.selectors;
export const categoriesReducer = categoriesSlice.reducer;
