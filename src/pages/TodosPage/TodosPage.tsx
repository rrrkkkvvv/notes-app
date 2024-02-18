
import { useState, useEffect } from 'react'
import Header from './components/todosHeader.tsx'
import Footer from './components/todosFooter.tsx'
import TodoList from './components/TodoList.tsx'
import AddTodo from './components/AddTodo.tsx'
import { todoStateItem } from './types/TodoTypes.ts'


export default function TodosPage() {
    let [todos, setTodos] = useState<todoStateItem[]>([])
    let [currentTodos, setCurrentTodos] = useState<todoStateItem[]>([])

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos')

        if (storedTodos) {
            try {
                const parsedTodos: todoStateItem[] = JSON.parse(storedTodos);
                setTodos(parsedTodos)
                setCurrentTodos(parsedTodos)
                setCurrentCategory('all')
            } catch (error) {
                console.error('Error parsing todos:', error);
            }
        } else {
            setCurrentCategory('all')

        }
    }, [])





    let [currentCategory, setCurrentCategory] = useState<string>('')

    let [countOfActiveTodos, setCountOfActiveTodos] = useState<number>(0)
    let [countOfCompletedTodos, setCountOfCompletedTodos] = useState<number>(0)



    function deleteTodo(id: number): void {
        let newTodos = todos.filter((todo) => todo.id !== id);
        newTodos.forEach((todo, index) => {
            todo.id = index;
        })
        setTodos(newTodos);
        setCurrentTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    useEffect(() => {
        let newCurrentCat = String(currentCategory)
        setTodosCategory(newCurrentCat)

    }, [currentCategory])
    useEffect(() => {
        let newCountOfActiveTodos = todos.filter((todo) => todo.completed !== true).length
        let newCountOfCompletedTodos = todos.filter((todo) => todo.completed === true).length

        setCountOfActiveTodos(newCountOfActiveTodos)
        setCountOfCompletedTodos(newCountOfCompletedTodos)

    }, [todos])

    function setTodosCategory(category: string): void {

        if (category === 'all') {
            setCurrentTodos(todos)
        } else if (category === 'active') {

            let newCurrTodos = todos.filter((todo) => todo.completed === false)

            setCurrentTodos(newCurrTodos)

        } else if (category === 'done') {
            let newCurrTodos = todos.filter((todo) => todo.completed === true)

            setCurrentTodos(newCurrTodos)
        }


    }

    const toggleTodo = (id: number): void => {
        let newTodos = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed, } : todo)
        let newCurrTodos = currentTodos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed, } : todo)

        setCurrentTodos(newCurrTodos)


        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const addTodo = (text: string): void => {
        let newTodo: todoStateItem = { id: todos.length, text: text, completed: false }
        setCurrentTodos([newTodo, ...currentTodos])
        setTodos([newTodo, ...todos])

        localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]));
    }



    return (

        <div className="todos-page  d-flex flex-column" >
            <Header />

            <main className="app-main">

                <TodoList todos={currentTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
            </main>
            <AddTodo addTodo={addTodo} />

            <Footer countOfActiveTodos={countOfActiveTodos} countOfCompletedTodos={countOfCompletedTodos} />
        </div>
    )
}

