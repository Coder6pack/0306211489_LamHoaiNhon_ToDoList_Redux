import { createReducer, createAction } from '@reduxjs/toolkit'
import { create } from 'domain'
import { Todo } from './@types/todo.type'

interface TodoList {
  toDoList: Todo[]
}
const initalState: TodoList = {
  toDoList: []
}

export const addToDoList = createAction<Todo>('addToDo')
export const deleteToDo = createAction<String>('deleteTodo')
const toDoListReducer = createReducer(initalState, (builder) => {
  builder
    .addCase(addToDoList, (state, action) => {
      const todo = action.payload
      state.toDoList.push(todo)
    })
    .addCase(deleteToDo, (state, action) => {
      const toDoId = action.payload
      const findId = state.toDoList.findIndex((todo) => todo.id === toDoId)
      if (findId !== -1) {
        state.toDoList.splice(findId, 1)
      }
    })
})

export default toDoListReducer
