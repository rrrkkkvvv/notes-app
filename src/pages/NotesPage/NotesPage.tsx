import { useEffect, useState, useCallback } from "react"
import INote from "./types/note"
import Notes from "./components/notes/Notes"
import { GoPlus } from "react-icons/go";
import FullNote from "./components/FullNote";
import Search from "./components/Search";
import Categories from "./components/Categories";
import { CategoryType } from "./types/Categories";
export default function NotesPage() {



    const [notesList, setNotesList] = useState<INote[]>([]);

    const [fullNoteVisibility, setFullNoteVisibility] = useState<boolean>(false);
    const [addFullNoteVisibility, setAddFullNoteVisibility] = useState<boolean>(false);
    const [categoryFullNoteVisibility, setCategoryFullNoteVisibility] = useState<boolean>(false);

    const [currentNotesList, setCurrentNotesList] = useState<INote[]>(notesList);
    const [currentFullNote, setCurrentFullNote] = useState<number>(0);
    const [currentCategory, setCurrentCategory] = useState<string>('all');

    const [categoriesList, setCategoriesList] = useState<CategoryType[]>([
        { key: 'all', title: 'All' },

    ]);


    const toggleModalVisibility = useCallback((type: string): void => {
        if (type === 'fullNote') {
            setFullNoteVisibility(!fullNoteVisibility);
        } else if (type === 'addNote') {
            setAddFullNoteVisibility(!addFullNoteVisibility);
        } else if (type === 'categoryModal') {
            setCategoryFullNoteVisibility(!categoryFullNoteVisibility);
        }
    }, [fullNoteVisibility, addFullNoteVisibility, categoryFullNoteVisibility]);

    const searchFilter = useCallback((inputText: string): void => {
        let filtredNoteList = notesList.filter((note) => note.text.includes(inputText.trim()) || note.title.includes(inputText.trim()));
        setCurrentNotesList(filtredNoteList);
    }, [currentNotesList]);



    useEffect(() => {
        let storedNotes = localStorage.getItem('notes');
        let storedCategories = localStorage.getItem('categories');
        if (storedNotes && storedCategories) {
            try {
                let parsedNotes: INote[] = JSON.parse(storedNotes);
                let parsedCategories: CategoryType[] = JSON.parse(storedCategories);

                setCurrentNotesList(parsedNotes);
                setNotesList(parsedNotes);
                if (parsedCategories.length) {
                    setCategoriesList(parsedCategories);

                } else {
                    setCategoriesList([{ key: 'all', title: 'All' }])
                }
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
            setCurrentNotesList(notesList.filter(note => note.category === key));
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
        let removeAgree = confirm(`You definitely want to remove an "${notesList[id].title}" note`);
        if (removeAgree) {


            let newNoteList = notesList.filter((note) => note.id !== id);
            newNoteList.forEach((note, index) => {
                note.id = index;
            });
            setNotesList(newNoteList);
            setCurrentNotesList(newNoteList);
            localStorage.setItem('notes', JSON.stringify(newNoteList));
        }
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
    function setFullNote(id: number): void {
        setCurrentFullNote(id);
        toggleModalVisibility('fullNote')
    }





    function createNewCategory(title: string) {
        let keyOfTitle = title.trim().toLowerCase();
        if (title.trim() !== '' && !categoriesList.some(category => category.key === keyOfTitle)) {

            setCategoriesList([...categoriesList, { key: keyOfTitle, title: title }]);
            localStorage.setItem('categories', JSON.stringify([...categoriesList, { key: keyOfTitle, title: title }]))
        }

    }
    function removeCategory(key: string) {
        let newCategoriesList = categoriesList.filter((category) => category.key !== key);
        setCategoriesList(newCategoriesList);
        localStorage.setItem('categories', JSON.stringify(newCategoriesList));


    }






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
                    <Notes toggleModalVisibility={toggleModalVisibility} setFullNote={setFullNote} removeNote={removeNote} notesList={currentNotesList} />
                </div>

                <GoPlus className="add-new-note" onClick={() => setAddFullNoteVisibility(true)} />

                <FullNote type={"add-note"}
                    addNewNote={createNewNote}
                    showAddFullNote={addFullNoteVisibility}
                    toggleModalVisibility={toggleModalVisibility} />
                <FullNote type={"reading-updating-note"}
                    currentFullNote={notesList[currentFullNote]}
                    updateNote={updateNote}
                    showFullNote={fullNoteVisibility}
                    toggleModalVisibility={toggleModalVisibility}
                />
                <FullNote type={"change-note-category"}
                    categoryList={categoriesList}
                    notesList={notesList}
                    currentFullNote={currentFullNote}
                    showCategoryFullNote={categoryFullNoteVisibility}
                    toggleModalVisibility={toggleModalVisibility}
                    setNoteCategory={setNoteCategory}
                    createNewCategory={createNewCategory}
                    removeCategory={removeCategory}
                />
            </main>

        </>
    )
}