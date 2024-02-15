
export interface CategoryType {
    key: string,
    title: string,

}

export interface CategoriesProps {
    categoryList: CategoryType[];
    setCurrentCategory: (key: string) => void;
    currentCategory: string
}

