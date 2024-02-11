import CurrentPageStatus from "./global types/CurrentPageStatus";
interface NavbarProps {
    setPage: (page: CurrentPageStatus) => void;
    currentPage: string
}

export default function Navbar({ setPage, currentPage }: NavbarProps) {
    return (
        <div>
            <nav className="navbar bg-body-tertiary border-bottom">
                <form className="container-fluid justify-content-center">
                    <button className={`btn btn-outline-warning me-2 ${currentPage === 'notes' ? 'bg-warning text-black' : ''}`} type="button" onClick={() => setPage('notes')}>Notes</button>
                    <button className={`btn btn-outline-warning me-2 ${currentPage === 'todos' ? 'bg-warning text-black' : ''}`} type="button" onClick={() => setPage('todos')}>Todos</button>
                </form>
            </nav></div>
    )
}
