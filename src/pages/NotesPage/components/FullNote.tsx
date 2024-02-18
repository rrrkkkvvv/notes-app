import { FullNotePorps } from '../types/note'
import { IoReturnDownBackOutline } from "react-icons/io5";
import { ChangeEvent, useState, KeyboardEvent } from 'react'
import { GoPlus } from "react-icons/go";


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
                <div className={`modal full-item  ${props.showFullNote && 'visible'}`} onClick={() => props.toggleModalVisibility('fullNote')}>
                    <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                        <span className='close-modal-x' onClick={() => props.toggleModalVisibility('fullNote')}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
                        <span className='category-choose-button' onClick={() => { props.toggleModalVisibility('fullNote'); props.toggleModalVisibility('categoryModal'); }}>Move to...</span>
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
                <div className={`modal full-item  ${props.showFullNote && 'visible'}`} onClick={() => props.toggleModalVisibility('fullNote')}>
                    <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                        <span className='close-modal-x' onClick={() => props.toggleModalVisibility('fullNote')}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
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
                props.toggleModalVisibility('addNote');
            }}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                    <span className='close-modal-x' onClick={() => {
                        setTitleText('');
                        setMainText('');
                        props.addNewNote(titleText, mainText);
                        props.toggleModalVisibility('addNote');
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
        const [addCategoryVisibility, setAddCategoryVisibility] = useState<boolean>(false);
        let [inputValue, setInputValue] = useState<string>('')

        const onKeyDownEvent = (e: KeyboardEvent): void => {
            if (e.key === 'Enter') {
                inputValue !== '' && props.createNewCategory(inputValue); setInputValue(''); setAddCategoryVisibility(false)
            }
        }
        return (
            <div>
                <div className={`modal full-item   ${props.showCategoryFullNote && 'visible'}`} onClick={() => {
                    props.toggleModalVisibility('categoryModal');

                }}>
                    <div className='modal-body category-modal-body' onClick={(e) => e.stopPropagation()} >

                        <span className='close-modal-x' onClick={() => {
                            props.toggleModalVisibility('categoryModal');
                        }}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>
                        <ul className="nav nav-pills flex-column">
                            {
                                props.categoryList.map((category) => (
                                    <li
                                        className="nav-item mt-1 w-100"
                                        key={category.key}
                                        role="button"
                                        onClick={() => {
                                            props.setNoteCategory(props.currentFullNote, category.key);
                                            setSelectedCategory(category.key);
                                        }}
                                    >
                                        <span
                                            className={`nav-link border category-change-button ${props.notesList[props.currentFullNote] && props.notesList[props.currentFullNote].category === category.key || selectedCategory === category.key ? 'bg-warning' : ''} text-black`}
                                            aria-current="page"
                                        >
                                            {category.title}
                                            {category.key !== 'all' &&
                                                <button className="btn remove-category  text-danger" onClick={(e) => { e.stopPropagation(); props.removeCategory(category.key); }} >
                                                    <i className="bi bi-trash3" ></i>
                                                </button>
                                            }

                                        </span>

                                    </li>


                                ))
                            }
                            <GoPlus className="add-new-category" onClick={() => setAddCategoryVisibility(true)} />

                        </ul>
                    </div>

                </div>
                {/*-------------- Creating and changing of categories--------- */}
                <div className={`modal  add-category-modal  ${addCategoryVisibility && 'visible'}`}
                    onClick={() => setAddCategoryVisibility(false)}>
                    <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                        <span className='close-modal-x'
                            onClick={() => setAddCategoryVisibility(false)}>
                            <IoReturnDownBackOutline ></IoReturnDownBackOutline >
                        </span>

                        <div className="text-input text-input--focus mb-3 mt-4">
                            <input className="form-control me-2 w-100 search-input"
                                value={inputValue} placeholder='Enter a title of category...'
                                onKeyDown={onKeyDownEvent}
                                onChange={(e) => setInputValue(e.target.value)} />
                        </div>
                        <button className=" btn btn-secondary " type='button'

                            onClick={() => {
                                inputValue !== '' && props.createNewCategory(inputValue);
                                setInputValue('');
                                setAddCategoryVisibility(false)
                            }}>Add</button>
                    </div>
                </div>
            </div>

        )
    }

}

export default FullNote;





