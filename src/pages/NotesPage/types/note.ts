import { CategoryType } from "./Categories";
export default interface INote {
    id: number;
    title: string;
    text: string;
    date: string;
    category: string;
}


export interface NotesProps {
    notesList: INote[];
    removeNote: (id: number) => void;
    setFullNote: (id: number) => void;
    toogleShowFullNote: () => void;

}
export interface NotePorps {
    note: INote;
    removeNote: (id: number) => void;
    setFullNote: (id: number) => void;
    toogleShowFullNote: () => void;
}



export type FullNotePorps = {
    type: 'reading-updating-note'
    currentFullNote: INote;
    showFullNote: boolean;
    toogleShowFullNote: () => void;
    toggleCategoryFullNote: () => void;
    updateNote: (argId: number, newTitle: string, newText: string) => void;
} | {
    type: 'add-note';
    showAddFullNote: boolean;
    toggleAddShowFullNote: () => void;
    addNewNote: (title: string, text: string) => void;
} | {
    type: 'change-note-category';
    currentFullNote: number;
    notesList: INote[];
    categoryList: CategoryType[];
    setNoteCategory: (id: number, category: string) => void;
    toggleCategoryFullNote: () => void;
    showCategoryFullNote: boolean;
    createNewCategory: (title: string) => void;
    removeCategory: (key: string) => void;
}



export interface SearchProps {
    searchFilter: (inputText: string) => void;
}