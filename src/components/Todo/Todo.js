import React, { useState } from 'react';
import { useEffect } from 'react';
import './Todo.css';

const Todo = () => {
    // getLocalItem
    function getLocalTodo() {
        let list = localStorage.getItem('list');
        if(list){
            return JSON.parse(localStorage.getItem('list'))
        }
        else{
            return []
        }
    }
    const [input, setInput] = useState(null);
    const [todo, setTodo] = useState(getLocalTodo())
    const [toggle, setToggle] = useState(false);
    const [editTodoId, setEditTodoId] = useState(null);

    const handleTodo = () => {
        if (!input) {
            // return empty
        }
        else if (input !== null && !toggle) {
            setTodo([...todo, input])
            setInput('')
        }
        else if (input !== null && toggle) {
            let res = todo.filter((elem, ind) => {
                return ind !== editTodoId
            })
            setTodo([...res, input])
            setInput('');
            setToggle(false);
        }
    }

    // delate tod
    const delateTodo = (id) => {
        let result = todo.filter((elem, ind) => {
            return ind !== id;
        })
        setTodo(result)
    }

    // edit todo
    const editTodo = (id) => {
        let editItem = todo.find((elem, ind) => {
            return ind == id;
        })
        setInput(editItem)
        setToggle(true)
        setEditTodoId(id)
    }

    // add in todo localStorge
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(todo))
    })

    return (
        <div>
            <div className="container">
                <div className="input-container">
                    <input type="text" placeholder='add todo' onChange={(e) => setInput(e.target.value)} value={input? input: ''} />
                    <button onClick={handleTodo} className="add">{toggle ? <i className="fa-solid fa-pen-to-square"></i> : <i class="fa-solid fa-plus"></i>}</button>
                    <div className="display">
                        {
                            todo ? todo.map((elem, ind) => {
                                return (
                                    <div className='singleTodo'>
                                        <h3>{elem}</h3>
                                        <div>
                                            <i className="fa-solid fa-trash-can" onClick={() => delateTodo(ind)}></i>
                                            <i className="fa-solid fa-pen-to-square" onClick={() => editTodo(ind)}></i>
                                        </div>
                                    </div>
                                )
                            })
                            :
                           ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;





