
interface CategoryType {
    key: string,
    title: string,
    activity: boolean,

}

export interface CategoriesProps {
    categoryList: CategoryType[];
}