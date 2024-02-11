export default interface INote {
    id: number;
    title: string;
    text: string;
    date: string;
}


export interface NotesProps {
    notesList: INote[];
    removeNote: (id: number) => void;
    setFullNote: (id: number) => void;
    toogleShowFullNote: () => void;

}
// type, currentFullNote, showFullNote, toogleShowFullNote, updateNote
export interface NotePorps {
    note: INote;
    removeNote: (id: number) => void;
    setFullNote: (id: number) => void;
    toogleShowFullNote: () => void;
}

// export interface FullNotePorps {
//     currentFullNote?: INote;
//     showFullNote: boolean;
//     toogleShowFullNote: () => void;
//     updateNote: (argId: number, newTitle: string, newText: string) => void;
// }

export type FullNotePorps = {
    type: 'reading-updating-note'
    currentFullNote: INote;
    showFullNote: boolean;
    toogleShowFullNote: () => void;
    updateNote: (argId: number, newTitle: string, newText: string) => void;
} | {
    type: 'add-note';
    showAddFullNote: boolean;
    toggleAddShowFullNote: () => void;
    addNewNote: (title: string, text: string) => void;
}



export interface SearchProps {
    searchFilter: (inputText: string) => void;
}