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
    toggleModalVisibility: (type: string) => void;

}
export interface NotePorps {
    note: INote;
    removeNote: (id: number) => void;
    setFullNote: (id: number) => void;
    toggleModalVisibility: (type: string) => void;
}



export type FullNotePorps = {
    type: 'reading-updating-note'
    currentFullNote: INote;
    showFullNote: boolean;
    toggleModalVisibility: (type: string) => void;
    updateNote: (argId: number, newTitle: string, newText: string) => void;
} | {
    type: 'add-note';
    showAddFullNote: boolean;
    toggleModalVisibility: (type: string) => void;
    addNewNote: (title: string, text: string) => void;
} | {
    type: 'change-note-category';
    currentFullNote: number;
    notesList: INote[];
    categoryList: CategoryType[];
    setNoteCategory: (id: number, category: string) => void;
    toggleModalVisibility: (type: string) => void;
    showCategoryFullNote: boolean;
    createNewCategory: (title: string) => void;
    removeCategory: (key: string) => void;
}



export interface SearchProps {
    searchFilter: (inputText: string) => void;
}