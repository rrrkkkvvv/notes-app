import { useEffect, useState } from "react"
import INote from "./types/note"
import Notes from "./components/notes/Notes"
import { GoPlus } from "react-icons/go";
import FullNote from "./components/fullNote/FullNote";
import Search from "./components/Search";
import Categories from "./components/categories/Categories";
export default function NotesPage() {



    const [notesList, setNotesList] = useState<INote[]>([]);
    const [currentNotesList, setCurrentNotesList] = useState<INote[]>(notesList)

    const [fullNoteVisibility, setFullNoteVisibility] = useState<boolean>(false);
    const [addFullNoteVisibility, setAddFullNoteVisibility] = useState<boolean>(false);
    const [currentFullNote, setCurrentFullNote] = useState<number>(0);
    const [categoriesList, setCategoriesList] = useState([
        { key: 'all', title: 'All', activity: true },
        { key: 'main', title: 'Main', activity: false },
        { key: 'diary', title: 'Diary', activity: false },
        { key: 'lessons', title: 'Lessons', activity: false },
        { key: 'any', title: 'any', activity: false },
    ]);


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

    function createNewNote(title: string, text: string): void {
        if (title.trim().length || text.trim().length) {
            let date = new Date().toLocaleString();
            let newNotesList = [...notesList, { id: notesList.length, title: title, text: text, date: date }];
            setNotesList(newNotesList);
            setCurrentNotesList([...currentNotesList, { id: currentNotesList.length, title: title, text: text, date: date }]);
            localStorage.setItem('notes', JSON.stringify(newNotesList));
        }
    }

    function removeNote(id: number): void {
        let newNoteList = notesList.filter((note) => note.id !== id);
        newNoteList.forEach((note, index) => {
            note.id = index;
        });
        setNotesList(newNoteList);
        setCurrentNotesList(newNoteList);
        localStorage.setItem('notes', JSON.stringify(newNoteList));

    }

    function setFullNote(id: number): void {

        setCurrentFullNote(id);
        toggleShowFullNote();

    }
    function toggleShowFullNote(): void {
        setFullNoteVisibility(!fullNoteVisibility);
    }
    function toggleAddShowFullNote(): void {
        setAddFullNoteVisibility(!addFullNoteVisibility);
    }

    function searchFilter(inputText: string) {
        let filtredNoteList = notesList.filter((note) => note.text.includes(inputText.trim()) || note.title.includes(inputText.trim()));
        setCurrentNotesList(filtredNoteList);

    }


    function updateNote(argId: number, newTitle: string, newText: string,) {
        let newDate = new Date().toLocaleString();

        const updatedNotesList = notesList.map(note => {
            if (note.id === argId) {

                return {
                    ...note,
                    title: newTitle,
                    text: newText,
                    date: newDate,

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
                <Categories categoryList={categoriesList} />
            </nav>
            <main >

                <div className="col-12   mt-2">
                    <Notes toogleShowFullNote={toggleShowFullNote} setFullNote={setFullNote} removeNote={removeNote} notesList={currentNotesList} />
                </div>

                <GoPlus className="add-new-note" onClick={() => setAddFullNoteVisibility(true)} />

                <FullNote type={"add-note"} addNewNote={createNewNote} showAddFullNote={addFullNoteVisibility} toggleAddShowFullNote={toggleAddShowFullNote} />
                <FullNote type={"reading-updating-note"} currentFullNote={notesList[currentFullNote]} updateNote={updateNote} showFullNote={fullNoteVisibility} toogleShowFullNote={toggleShowFullNote} />
            </main>

        </>
    )
}