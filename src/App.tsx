import { useState } from "react"
import TodosPage from "./pages/TodosPage/TodosPage"
import NotesPage from "./pages/NotesPage/NotesPage"

function App() {


  let [currentPage] = useState<string>('todos');


  if (currentPage === 'notes') {
    return (
      <NotesPage />
    )
  } else if (currentPage === 'todos') {
    return (
      <TodosPage />
    )
  }


}

export default App
