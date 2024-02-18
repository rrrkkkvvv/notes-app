
export interface AddTodoType {
    addTodo: (text: string) => any,
}

export interface todoStateItem {
    id: number,
    text: string,
    completed: boolean,
}

export interface TodoListType {
    todos: Array<todoStateItem>,
    deleteTodo: (id: number) => any,
    toggleTodo: (id: number) => any,

}
export interface TodoType extends todoStateItem {
    deleteTodo: (id: number) => any,
    toggleTodo: (id: number) => any,
}
export interface FooterType {
    countOfActiveTodos: number,
    countOfCompletedTodos: number,
}
