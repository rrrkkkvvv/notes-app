import { CategoriesProps } from "../../types/Categories";

export default function Categories({ categoryList }: CategoriesProps) {
  return (
    <div className="menu-wrapper">
      <ul className="nav nav-pills ">
        {
          categoryList.map((category) => (

            <li className="nav-item" key={category.key}>
              <span className={`nav-link ${category.activity && 'bg-warning'} text-black `} aria-current="page"  >{category.title}</span>
            </li>
          ))
        }

      </ul>
    </div>
  )
}
