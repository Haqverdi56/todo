import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../features/todoSlice'
import AccordionC from './AccordionC'
import './todo.scss'
// MODAL
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material'

const Todo = () => {
  const [ title, setTitle ] = useState("");
  const [ description, setDescription] = useState();
  const [ sort, setSort ] = useState("all");
  const [open, setOpen] = useState(false);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  
  const onSubmit = (e) => {
    e.preventDefault();
  }
  const addTodo = () => {
    dispatch(add({title, description}))
    setTitle("");
    setDescription("");
    handleClose()
  }
  // MODAL
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const styleButton = {
    width: 200,
    bgcolor: '#008e9f',
    border: '2px solid #000',
    boxShadow: 24,
    color: "white",
    m: 1
  };

  return (
    <div className='todoApp'>
      <div>
        <h1>Todo App</h1>
      </div>
      <div className='form-div'>
        <div>
          <Button sx={styleButton} onClick={handleOpen} className='todo-button'>New Task</Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 600,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {/* <Form /> */}
                  <form onSubmit={onSubmit} action="" className='form'>
                    <TextField
                    onChange={(e)=> {setTitle(e.target.value)}} value={title} className='todo-input' type="text"
                    id="standard-textarea"
                    label="New Task"
                    variant="standard"
                    />
                    <TextField
                    onChange={(e)=>setDescription(e.target.value)} value={description} className='todo-input' type="text"
                    id="standard-textarea"
                    label="Description"
                    variant="standard"
                    />
                    <Button type='submit' disabled={!title || !title.trim() || !description} onClick={()=>addTodo()} className='todo-button' variant="contained">Complete</Button>
                  </form>
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div> 
      {/* Filter todos */}
      <div className='display-todos'>
        <button id='filter-buttons' onClick={()=>setSort('all')}>All</button>
        <button id='filter-buttons' onClick={()=>setSort('completed')}>Completed</button>
        <button id='filter-buttons' onClick={()=>setSort('active')}>Active</button>
      </div>
      <div>
        <ul className='todo-ul'>
          {todos.length > 0 && sort ==="all" 
          ? todos.map((todo) => {
            return (
              (
              <li key={todo.id} className={todo.completed ? "green-li" : "todo-li"}>
                <AccordionC todo={todo}/>
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
                <AccordionC todo={todo}/>
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
                  <AccordionC todo={todo}/>
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