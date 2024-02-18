import { CategoriesProps } from "../types/Categories";

export default function Categories({ categoryList, setCurrentCategory, currentCategory }: CategoriesProps) {
  return (
    <div className="menu-wrapper">
      <ul className="nav nav-pills ">
        {
          categoryList.map((category) => (

            <li className="nav-item" key={category.key} role="button" onClick={() => setCurrentCategory(category.key)}>
              <span className={`nav-link ${category.key === currentCategory && 'bg-warning'} text-black `} aria-current="page"  >{category.title}</span>
            </li>
          ))
        }

      </ul>
    </div>
  )
}
