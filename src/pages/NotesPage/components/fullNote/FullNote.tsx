import { FullNotePorps } from '../../types/note'
import { IoReturnDownBackOutline } from "react-icons/io5";
import { ChangeEvent } from 'react'
export default function FullNote({ currentFullNote, showFullNote, toogleShowFullNote, updateNote }: FullNotePorps) {

    if (currentFullNote) {


        function onInputText(e: ChangeEvent<HTMLTextAreaElement>) {

            updateNote(currentFullNote!.id, currentFullNote!.title, e.target.value);

        }


        function onInputTitle(e: ChangeEvent<HTMLInputElement>) {

            updateNote(currentFullNote!.id, e.target.value, currentFullNote!.text);

        }


        return (
            <div className={`modal full-item  ${showFullNote && 'visible'}`} onClick={toogleShowFullNote}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                    <span className='close-modal-x' onClick={toogleShowFullNote}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
                    <span className='fullNote-date-block'>{currentFullNote.date}</span>
                    <span className='fullNote-text-length-block'>{currentFullNote.text.length} symblos</span>
                    <input type='text' className='input-fullNote' placeholder='Title...' value={currentFullNote.title} onChange={
                        (e) => {
                            onInputTitle(e);
                        }
                    } />
                    <textarea name="" id="" className='text-area-fullNote' placeholder='Text...' value={currentFullNote.text} onChange={
                        (e) => {
                            onInputText(e);
                        }
                    } cols={30} rows={10}></textarea>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`modal full-item  ${showFullNote && 'visible'}`} onClick={toogleShowFullNote}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                    <span className='close-modal-x' onClick={toogleShowFullNote}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
                    <h1>...</h1>
                </div>
            </div>
        )
    }
}



