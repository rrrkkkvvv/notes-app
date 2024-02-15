import { useEffect, useState } from "react"
import INote from "./types/note"
import Notes from "./components/notes/Notes"
import { GoPlus } from "react-icons/go";
import FullNote from "./components/fullNote/FullNote";
import Search from "./components/Search";
import Categories from "./components/categories/Categories";
import { CategoryType } from "./types/Categories";
export default function NotesPage() {



    let [notesList, setNotesList] = useState<INote[]>([]);
    let [currentNotesList, setCurrentNotesList] = useState<INote[]>(notesList);

    let [fullNoteVisibility, setFullNoteVisibility] = useState<boolean>(false);
    let [addFullNoteVisibility, setAddFullNoteVisibility] = useState<boolean>(false);
    let [categoryFullNoteVisibility, setCategoryFullNoteVisibility] = useState<boolean>(false);
    let [currentFullNote, setCurrentFullNote] = useState<number>(0);
    let [currentCategory, setCurrentCategory] = useState<string>('all');

    // const [categoriesList, setCategoriesList] = useState<CategoryType[]>([
    const [categoriesList] = useState<CategoryType[]>([
        { key: 'all', title: 'All' },
        { key: 'main', title: 'Main' },
        { key: 'diary', title: 'Diary' },
        { key: 'lessons', title: 'Lessons' },
        { key: 'any', title: 'any' },
    ]);


    useEffect(() => {
        let storedNotes = localStorage.getItem('notes');
        if (storedNotes) {
            try {
                let parsedNotes: INote[] = JSON.parse(storedNotes);
                setCurrentNotesList(parsedNotes);
                setNotesList(parsedNotes);
            } catch (error) {
                console.error('Error parsing notes', error);
            }

        }
    }, [])


    function setCategory(key: string) {
        if (key === 'all') {

            setCurrentCategory(key);
            setCurrentNotesList(notesList);

        } else {
            setCurrentCategory(key);
            setCurrentNotesList(currentNotesList = notesList.filter(note => note.category === key));
        }

    }
    function setNoteCategory(id: number, category: string): void {
        let newNotesList = notesList;
        newNotesList.forEach(note => note.id === id ? note.category = category : note);
        setNotesList(newNotesList);
        setCurrentNotesList(newNotesList);
        setCategory(category);
        localStorage.setItem('notes', JSON.stringify(newNotesList));

    }
    function createNewNote(title: string, text: string): void {

        if (title.trim().length || text.trim().length) {
            let date = new Date().toLocaleString();
            let newNotesList = [...notesList, { id: notesList.length, title: title, text: text, date: date, category: currentCategory }];
            setNotesList(newNotesList);
            setCurrentNotesList([...currentNotesList, { id: currentNotesList.length, title: title, text: text, date: date, category: currentCategory }]);
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
    function toggleCategoryFullNote(): void {
        setCategoryFullNoteVisibility(!categoryFullNoteVisibility);
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
                <Categories currentCategory={currentCategory} setCurrentCategory={setCategory} categoryList={categoriesList} />
            </nav>
            <main >

                <div className="col-12   mt-2">
                    <Notes toogleShowFullNote={toggleShowFullNote} setFullNote={setFullNote} removeNote={removeNote} notesList={currentNotesList} />
                </div>

                <GoPlus className="add-new-note" onClick={() => setAddFullNoteVisibility(true)} />

                <FullNote type={"add-note"}
                    addNewNote={createNewNote}
                    showAddFullNote={addFullNoteVisibility}
                    toggleAddShowFullNote={toggleAddShowFullNote} />
                <FullNote type={"reading-updating-note"}
                    currentFullNote={notesList[currentFullNote]}
                    updateNote={updateNote}
                    showFullNote={fullNoteVisibility}
                    toogleShowFullNote={toggleShowFullNote}
                    toggleCategoryFullNote={toggleCategoryFullNote} />
                <FullNote type={"change-note-category"}
                    categoryList={categoriesList}
                    notesList={notesList}
                    currentFullNote={currentFullNote}
                    showCategoryFullNote={categoryFullNoteVisibility}
                    toggleCategoryFullNote={toggleCategoryFullNote}
                    setNoteCategory={setNoteCategory}
                />
            </main>

        </>
    )
}