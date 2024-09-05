import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  useEffect(()=>{
    console.log(location.pathname)
  },[location])

  return (
    <nav className="navbar bg-body-tertiary border-bottom p-3">
      <form className="container-fluid justify-content-center">
        <button
          className={`btn btn-outline-warning me-2 ${
            location.pathname === "/notes" ? "bg-warning text-black" : ""
          }`}
          type="button"
        >
          <Link className="text-black text-decoration-none" to="/notes">Notes</Link>
        </button>
        <button
          className={`btn btn-outline-warning me-2 ${
            location.pathname === "/todos" ? "bg-warning text-black" : ""
          }`}
          type="button"
        >
          <Link className="text-black text-decoration-none" to="/todos">Todos</Link>
        </button>
      </form>
    </nav>
  );
}
