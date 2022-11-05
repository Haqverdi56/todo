import { createSlice } from "@reduxjs/toolkit";
import { v4 } from 'uuid'

const initialState = [

]

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        add: (state, action) => {
            const newTodo = {
                id: v4(), 
                title: action.payload,
                // date: new Date(), 
                completed: false
            }
            state.push(newTodo)
        },
        remove: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload)
        },
        done: (state, action) => {
            state.map((todo)=> todo.id == action.payload ? todo.completed = true : false)
        },
        addTime: (state, action) => {
            state.map((todo)=> todo.id == action.payload.id ? todo.date = action.payload.date : null)
        }
    }
});

export default todoSlice.reducer;
export const { add, remove, done, addTime } = todoSlice.actions;