import { TodoType } from '../types/TodoTypes'

const TodoItem = ({ completed, text, id, deleteTodo, toggleTodo }: TodoType) => {

    if (text !== '') {
        return (
            <>
                <li className={`todo-item mb-3 p-2 rounded todo-item  d-flex align-items-center justify-content-between ${completed === true ? 'gray text-secondary text-decoration-line-through' : ' '} `} onClick={() => toggleTodo(id)}>
                    <div className={`todo-item__status `}>
                        <i className={`bi fs-4  text-white btn ${completed === true ? 'bi-x-lg bg-secondary bg-opacity-50' : ' bi-check2 bg-warning'} `}></i>
                    </div>
                    <span className="todo-item__text  ">{text} </span>
                    <button className="todo-item__remove-button btn fs-5  text-danger" onClick={(e) => { e.stopPropagation(); deleteTodo(id); }} >
                        <i className="bi bi-trash3 " ></i>
                    </button>
                </li>
            </>
        )
    }



}
export default TodoItem
