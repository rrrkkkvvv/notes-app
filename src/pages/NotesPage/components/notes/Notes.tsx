import { NotesProps } from '../../types/note'
import Note from './Note'

export default function Notes({ notesList, removeNote, setFullNote, toggleModalVisibility }: NotesProps) {
    if (notesList.length > 0) {
        return (
            <div className='row'>
                {notesList.map((note) => (
                    <Note removeNote={removeNote} setFullNote={setFullNote} toggleModalVisibility={toggleModalVisibility} note={note} key={note.id} />
                ))}
            </div>

        )
    } else {
        return (
            <h2 style={{ marginLeft: '20px' }}>
                Add notes please...
            </h2>

        )
    }


}
