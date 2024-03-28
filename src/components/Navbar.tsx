import CurrentPageStatus from "../global types/CurrentPageStatus";
interface NavbarProps {
    setCurrentPage: (page: CurrentPageStatus) => void;
    currentPage: string
}

export default function Navbar({ setCurrentPage, currentPage }: NavbarProps) {
    return (
        <div>
            <nav className="navbar bg-body-tertiary border-bottom p-3">
                <form className="container-fluid justify-content-center">
                    <button className={`btn btn-outline-warning me-2 ${currentPage === 'notes' ? 'bg-warning text-black' : ''}`} type="button" onClick={() => setCurrentPage('notes')}>Notes</button>
                    <button className={`btn btn-outline-warning me-2 ${currentPage === 'todos' ? 'bg-warning text-black' : ''}`} type="button" onClick={() => setCurrentPage('todos')}>Todos</button>
                </form>
            </nav></div>
    )
}
