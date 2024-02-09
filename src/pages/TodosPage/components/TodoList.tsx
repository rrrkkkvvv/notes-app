import TodoItem from './TodoItem'
import TodoListType from '../types/TodoListType'

const TodoList = ({ todos, deleteTodo, toggleTodo }: TodoListType) => {

    if (todos.length > 0) {
        return (
            <ul className="todo-list list-unstyled">

                {todos.map(todo => (
                    <TodoItem key={todo.id} deleteTodo={deleteTodo} toggleTodo={toggleTodo} completed={todo.completed} id={todo.id} text={todo.text} />
                ))}
            </ul>
        )
    } else {
        return (
            <h2 className='m-3'>Add todos please...</h2>
        )
    }


}
export default TodoList