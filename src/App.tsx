import { useState } from "react"
import TodosPage from "./pages/TodosPage/TodosPage"
import NotesPage from "./pages/NotesPage/NotesPage"
import Navbar from "./Navbar";
function App() {


  let [currentPage, setCurrentPage] = useState<string>('notes');


  function setPage(page: string): void {
    setCurrentPage(page)
  }
  if (currentPage === 'notes') {
    return (

      <div>
        <Navbar setPage={setPage} currentPage={currentPage} />

        <NotesPage />
      </div>
    )
  } else if (currentPage === 'todos') {
    return (
      <div>
        <Navbar setPage={setPage} currentPage={currentPage} />
        <TodosPage />
      </div>
    )
  }


}

export default App
