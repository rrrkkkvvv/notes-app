
import { NotePorps } from '../../types/note'

export default function Note({ note, removeNote, setFullNote, toggleModalVisibility }: NotePorps) {
    return (

        <div className="card-thumb col-lg-3 col-sm-6 col-md-6 col-6">
            <div className="card" onClick={() => {
                setFullNote(note.id);
                toggleModalVisibility('fullNote');
            }}>
                <div className='remove-note' onClick={(e) => { e.stopPropagation(); removeNote(note.id); }}>X</div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.text}</p>

                    <div className="date-block">{note.date}</div>
                </div>

            </div>
        </div>


    )
}
