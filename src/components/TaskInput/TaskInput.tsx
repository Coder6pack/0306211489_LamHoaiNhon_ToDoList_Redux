import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'
import { useDispatch } from 'react-redux'
import { addToDoList, deleteToDo } from '../../reducer'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editCurrentTodo: (id: string) => void
  endEditCurrentTodo: () => any
}
const initialState = {
  id: '',
  name: '',
  done: false
}
export default function TaskInput() {
  const [name, setName] = useState<Todo>(initialState)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toDoWithId = { ...name, id: new Date().toISOString() }
    dispatch(addToDoList(toDoWithId))
    setName((prev) => ({ ...prev, name: '' }))
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName((prev) => ({ ...prev, name: value }))
  }
  return (
    <div className='mb-2'>
      <h3 className={styles.title}>To Do List</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='Input check here' value={name.name} onChange={handleOnChange} />
        <button type='submit'>{'➕'}</button>
      </form>
    </div>
  )
}
