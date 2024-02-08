import { useEffect, useState } from "react"
import INote from "../../types/note"
import Notes from "./components/notes/Notes"
import { GoPlus } from "react-icons/go";
import FullNote from "./components/fullNote/FullNote";
import Search from "./components/Search";
export default function NotesPage() {



    const [notesList, setNotesList] = useState<INote[]>([]);
    const [currentNotesList, setCurrentNotesList] = useState<INote[]>(notesList)

    const [fullNoteVisibility, setFullNoteVisibility] = useState<boolean>(false);
    const [currentFullNote, setCurrentFullNote] = useState<number>(0);

    useEffect(() => {
        let storedNotes = localStorage.getItem('notes');
        if (storedNotes) {
            try {
                let parsedNotes: INote[] = JSON.parse(storedNotes);
                setCurrentNotesList(parsedNotes);
                setNotesList(parsedNotes);
            } catch (error) {
                console.error('Error parsing notes', error)
            }

        }
    }, [])

    function createNewNote(): void {
        let newNotesList = [...notesList, { id: notesList.length, title: '', text: '' }]
        setNotesList(newNotesList);
        setCurrentNotesList([...currentNotesList, { id: currentNotesList.length, title: '', text: '' }])
        setFullNote(notesList.length);
        localStorage.setItem('notes', JSON.stringify(newNotesList));

        toggleShowFullNote()
    }

    function removeNote(id: number): void {
        let newNoteList = notesList.filter((note) => note.id !== id)
        setNotesList(newNoteList);
        setCurrentNotesList(newNoteList);
        localStorage.setItem('notes', JSON.stringify(newNoteList))

    }

    function setFullNote(id: number): void {
        setCurrentFullNote(id);
    }
    function toggleShowFullNote(): void {
        setFullNoteVisibility(!fullNoteVisibility);
    }

    function searchFilter(inputText: string) {
        setTimeout(() => {
            let filtredNoteList = notesList.filter((note) => note.text.includes(inputText.trim()) || note.title.includes(inputText.trim()));
            setCurrentNotesList(filtredNoteList);
        }, 500);

    }


    function updateNote(argId: number, newTitle: string, newText: string,) {

        const updatedNotesList = notesList.map(note => {
            if (note.id === argId) {

                return {
                    ...note,
                    title: newTitle,
                    text: newText,
                };
            }
            return note;
        });


        setNotesList(updatedNotesList);
        setCurrentNotesList(updatedNotesList);
        localStorage.setItem('notes', JSON.stringify(updatedNotesList));

    };




    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid  mt-2 justify-content-center">
                    <h1>Notes</h1>
                </div>
                <form className="container-fluid justify-content-center mt-3 " role="search">
                    <Search searchFilter={searchFilter} />
                </form>
            </nav>
            <main className=" ">

                <div className="col-12   mt-2">
                    <Notes toogleShowFullNote={toggleShowFullNote} setFullNote={setFullNote} removeNote={removeNote} notesList={currentNotesList} />
                </div>

                <GoPlus className="add-new-note" onClick={createNewNote} />

                <FullNote currentFullNote={notesList[currentFullNote]} updateNote={updateNote} showFullNote={fullNoteVisibility} toogleShowFullNote={toggleShowFullNote} />
            </main>

        </>
    )
}