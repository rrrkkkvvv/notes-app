import { useState, KeyboardEvent } from 'react'
import { GoPlus } from "react-icons/go";
import { IoReturnDownBackOutline } from "react-icons/io5";
// import { ChangeEvent } from 'react'
import AddTodoType from '../types/AddTodotype'

export default function AddTodo({ addTodo }: AddTodoType) {

    let [addTaskVisible, setAddTaskVisible] = useState<boolean>(false)


    let [inputValue, setInputValue] = useState<string>('')

    const onKeyDownEvent = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            inputValue !== '' && addTodo(inputValue); setInputValue(''); setAddTaskVisible(false)
        }
    }
    return (
        <section className="add-todo" >

            <GoPlus className="add-new-note" onClick={() => setAddTaskVisible(true)} />

            {/* <div className="add-todo__form " style={{ display: addTaskVisible === true ? 'grid' : 'none' }}>
                <div className='form-header'>

                    <div className='d-flex justify-content-around align-items-center w-100 p-3'>
                        <h4 className='mr-6'>Make your task!</h4>

                        <div className=" fs-2 text-danger" onClick={() => setAddTaskVisible(false)}>X
                        </div>

                    </div>
                </div>

                <div className="text-input text-input--focus">
                    <input className="form-control me-2 w-100 search-input" value={inputValue} onKeyDown={onKeyDownEvent} onChange={(e) => setInputValue(e.target.value)} />
                </div>
                <button className=" btn btn-secondary " type='button'

                    onClick={() => { inputValue !== '' && addTodo(inputValue); setInputValue('') }}>Add</button>
            </div> */}
            <div className={`modal   ${addTaskVisible && 'visible'}`} onClick={() => setAddTaskVisible(!addTaskVisible)}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >

                    <span className='close-modal-x' onClick={() => setAddTaskVisible(!addTaskVisible)}><IoReturnDownBackOutline ></IoReturnDownBackOutline ></span>

                    <div className="text-input text-input--focus mb-3 mt-4">
                        <input className="form-control me-2 w-100 search-input" value={inputValue} placeholder='Enter a text of todo...' onKeyDown={onKeyDownEvent} onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <button className=" btn btn-secondary  " type='button'

                        onClick={() => { inputValue !== '' && addTodo(inputValue); setInputValue(''); setAddTaskVisible(false) }}>Add</button>
                </div>
            </div>
        </section>
    )
}
