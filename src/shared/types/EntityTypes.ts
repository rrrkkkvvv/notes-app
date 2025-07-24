export type TNote = {
  id: string;
  title: string;
  text: string;
  date: string;
  categoryKey: string;
};
export type TTodo = {
  id: string;
  text: string;
  completed: boolean;
};
export type TCategory = {
  key: string;
  title: string;
};

export type TNotesList = TNote[];
export type TTodosList = TTodo[];
export type TCategoriesList = TCategory[];
export type TNewNote = {
  title: string;
  text: string;
  categoryKey: string;
};
export type TUpdatedNote = {
  id: string;
  title?: string;
  text?: string;
  categoryKey?: string;
};
