import TodoType from '../types/TodoType'

const TodoItem = ({ completed, text, id, deleteTodo, toggleTodo }: TodoType) => {

    if (text !== '') {
        return (
            <>
                <li className={`todo-item mb-3 p-2  d-flex align-items-center justify-content-between ${completed === true ? 'todo-item--done' : ''} `} onClick={() => toggleTodo(id)}>
                    <div className="todo-item__status ">
                        <i className="bi bi-check2 bg-warning text-white btn"></i>
                    </div>
                    <span className="todo-item__text">{text} </span>
                    <button className="todo-item__remove-button btn  text-danger" onClick={(e) => { e.stopPropagation(); deleteTodo(id); }} >
                        <i className="bi bi-trash3" ></i>
                    </button>
                </li>
            </>
        )
    }



}
export default TodoItem
