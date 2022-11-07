import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BsTrash } from 'react-icons/bs'
import { IoMdDoneAll } from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { remove, done } from '../features/todoSlice';

const AccordionC = ({todo}) => {
  const dispatch = useDispatch()
  const deleteTodo = (id) => {
    dispatch(remove(id))
  }
  const completed = (id) => {
    dispatch(done(id))
  }
  return (
    <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <p>{todo.title}</p>
              <div className='icons'>
                <i className='delete' onClick={() => deleteTodo(todo.id)}><BsTrash /></i>
                <i className='done' onClick={()=>completed(todo.id)}><IoMdDoneAll /></i>
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p>{todo.description}</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
    </>
  )
}

export default AccordionC