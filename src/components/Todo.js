import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './todo.scss'
import { add, remove, done, addTime} from '../features/todoSlice'
import { BsTrash } from 'react-icons/bs'
import { IoMdDoneAll } from 'react-icons/io'

const Todo = () => {
  const [ title, setTitle ] = useState("");
  const [ sort, setSort ] = useState("all");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    todos.map((todo)=> {
      let time = new Date(todo.date);
      let currentTime = new Date();
      if(time < currentTime){
        console.log("kicik");
      }
    }, [todos])
  })
  const onSubmit = (e) => {
    e.preventDefault()
  }

  const addTodo = () => {
    dispatch(add(title))
    setTitle("")
  }
  
  const deleteTodo = (id) => {
    dispatch(remove(id))
  }

  const completed = (id) => {
    dispatch(done(id))
  }
  const addDate = (date, id) => {
    dispatch(addTime({date, id}))
  }

  return (
    <div className='todoApp'>
      <div>
        <h1>Todo App</h1>
      </div>
      <div className='form-div'>
        <form onSubmit={onSubmit} action="" className='form'>
          <input onChange={(e)=> {setTitle(e.target.value)}} value={title} className='todo-input' type="text" placeholder='New Task' />
          <button type='submit' disabled={!title || !title.trim()} onClick={addTodo} className='todo-button'>Add</button>
        </form>
      </div> 
      {/* filter todo */}
      <div className='display-todos'>
        <button onClick={()=>setSort('all')}>All</button>
        <button onClick={()=>setSort('completed')}>Completed</button>
        <button onClick={()=>setSort('active')}>Active</button>
      </div>
      <div>
        <ul className='todo-ul'>
          {todos.length > 0 && sort ==="all" 
          ? todos.map((todo) => {
            return (
              (
                <li key={todo.id} className={todo.completed ? "green-li" : "todo-li"}>
                  <span>{todo.title}</span>
                  <div className='icons'>
                    <i className='delete' onClick={() => deleteTodo(todo.id)}><BsTrash /></i>
                    <i className='done' onClick={()=>completed(todo.id)}><IoMdDoneAll /></i>
                    <input onChange={(e)=> addDate(e.target.value, todo.id)} type="date" value={todo.date} />
                  </div>
                </li>
              )
            )
          }) : null}
          {/* Completed todos */}
          {todos.length > 0 && sort === 'completed' 
          ? todos.map((todo) => {
            return (
              todo.completed === true && (
                <li key={todo.id} className={todo.completed ? "green-li" : "todo-li"}>
                  <span>{todo.title}</span>
                  <div className='icons'>
                    <i className='delete' onClick={() => deleteTodo(todo.id)}><BsTrash /></i>
                    <i className='done' onClick={()=> completed(todo.id)}><IoMdDoneAll /></i>
                  </div>
                </li>
              )
            )
          }) : null}
          {/* active todos */}
          {todos.length > 0 && sort === 'active' 
          ? todos.map((todo) => {
            return (
              todo.completed === false && (
                <li key={todo.id} className={todo.completed ? "green-li" : "todo-li"}>
                  <span>{todo.title}</span>
                  <div className='icons'>
                    <i className='delete' onClick={() => deleteTodo(todo.id)}><BsTrash /></i>
                    <i className='done' onClick={()=> completed(todo.id)}><IoMdDoneAll /></i>
                    <input onChange={(e)=> addDate(e.target.value, todo.id)} type="date" value={todo.date} />
                  </div>
                </li>
              )
            )
          }) : null}
        </ul>
      </div>
    </div>
  )
}

export default Todo

// {todos.map((todo) => (
//   <li key={todo.id} className={todo.completed ? "green-li" : "todo-li"}>
//     <span>{todo.title}</span>
//     <div className='icons'>
//       <i className='delete' onClick={() => deleteTodo(todo.id)}><BsTrash /></i>
//       <i className='done' onClick={()=>completed(todo.id)}><IoMdDoneAll /></i>
//     </div>
//   </li>
// ))}