import { useState } from "react"
import TodosPage from "../pages/TodosPage/TodosPage"
import NotesPage from "../pages/NotesPage/NotesPage"
import Navbar from "./Navbar";
import CurrentPageStatus from "../global types/CurrentPageStatus";

function App() {

  let [currentPage, setCurrentPage] = useState<CurrentPageStatus>('notes');


  function setPage(page: CurrentPageStatus): void {
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
