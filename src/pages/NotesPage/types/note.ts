export default interface INote {
    id: number;
    title: string;
    text: string;
    date: Date;
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

export interface FullNotePorps {
    currentFullNote?: INote;
    showFullNote: boolean;
    toogleShowFullNote: () => void;
    updateNote: (argId: number, newTitle: string, newText: string) => void;
}

export interface SearchProps {
    searchFilter: (inputText: string) => void;
}