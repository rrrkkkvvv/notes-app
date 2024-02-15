import { FullNotePorps } from '../../types/note'
import { IoReturnDownBackOutline } from "react-icons/io5";
import { ChangeEvent, useState } from 'react'


const FullNote: React.FC<FullNotePorps> = (props) => {



    if (props.type === "reading-updating-note") {

        if (props.currentFullNote) {


            function onInputText(e: ChangeEvent<HTMLTextAreaElement>) {
                props.type === "reading-updating-note" &&
                    props.updateNote(props.currentFullNote!.id, props.currentFullNote!.title, e.target.value);

            }


            function onInputTitle(e: ChangeEvent<HTMLInputElement>) {
                props.type === "reading-updating-note" &&
                    props.updateNote(props.currentFullNote!.id, e.target.value, props.currentFullNote!.text);

            }


            return (
                <div className={`modal full-item  ${props.showFullNote && 'visible'}`} onClick={props.toogleShowFullNote}>
                    <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                        <span className='close-modal-x' onClick={props.toogleShowFullNote}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
                        <span className='category-choose-button' onClick={() => { props.toogleShowFullNote(); props.toggleCategoryFullNote(); }}>Move to...</span>
                        <span className='fullNote-date-block'>{props.currentFullNote.date}</span>
                        <span className='fullNote-text-length-block'>{props.currentFullNote.text.length} symblos</span>
                        <input type='text' className='input-fullNote' placeholder='Title...' value={props.currentFullNote.title} onChange={
                            (e) => {
                                onInputTitle(e);
                            }
                        } />
                        <textarea name="" id="" className='text-area-fullNote' placeholder='Text...' value={props.currentFullNote.text} onChange={
                            (e) => {
                                onInputText(e);
                            }
                        } cols={30} rows={10}></textarea>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={`modal full-item  ${props.showFullNote && 'visible'}`} onClick={props.toogleShowFullNote}>
                    <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                        <span className='close-modal-x' onClick={props.toogleShowFullNote}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
                        <h1>...</h1>
                    </div>
                </div>
            )
        }

    } else if (props.type === 'add-note') {
        let [titleText, setTitleText] = useState<string>('');
        let [mainText, setMainText] = useState<string>('');
        return (
            <div className={`modal full-item  ${props.showAddFullNote && 'visible'}`} onClick={() => {
                setTitleText('');
                setMainText('');
                props.addNewNote(titleText, mainText);
                props.toggleAddShowFullNote();
            }}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                    <span className='close-modal-x' onClick={() => {
                        setTitleText('');
                        setMainText('');
                        props.addNewNote(titleText, mainText);
                        props.toggleAddShowFullNote();
                    }}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
                    <span className='fullNote-date-block'></span>
                    <span className='fullNote-text-length-block'>{mainText.length} symblos</span>
                    <input type='text' className='input-fullNote' placeholder='Title...' value={titleText} onChange={(e) => {
                        setTitleText(e.target.value);

                    }} />
                    <textarea name="" id="" className='text-area-fullNote' placeholder='Text...' value={mainText} onChange={(e) => {
                        setMainText(e.target.value);
                    }} cols={30} rows={10}></textarea>
                </div>
            </div>
        )
    } else if (props.type === 'change-note-category') {
        const [selectedCategory, setSelectedCategory] = useState<string>('');

        return (
            <div className={`modal full-item  ${props.showCategoryFullNote && 'visible'}`} onClick={() => {
                props.toggleCategoryFullNote();

            }}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                    <span className='close-modal-x' onClick={() => {
                        props.toggleCategoryFullNote();
                    }}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
                    <ul className="nav nav-pills flex-column">
                        {
                            props.categoryList.map((category) => (


                                <li
                                    className="nav-item mt-2"
                                    key={category.key}
                                    role="button"
                                    onClick={() => {
                                        props.setNoteCategory(props.currentFullNote, category.key);
                                        setSelectedCategory(category.key);
                                    }}
                                >
                                    <span
                                        className={`nav-link ${props.notesList[props.currentFullNote] && props.notesList[props.currentFullNote].category === category.key || selectedCategory === category.key ? 'bg-warning' : ''} text-black`}
                                        aria-current="page"
                                    >
                                        {category.title}
                                    </span>
                                </li>


                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }

}

export default FullNote;





