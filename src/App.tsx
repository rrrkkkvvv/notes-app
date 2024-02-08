import NotesPage from "./pages/NotesPage/NotesPage"
import { useState } from "react"
import TodosPage from "./pages/TodosPage/TodosPage"
function App() {


  let [currentPage] = useState<string>('notes');


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
