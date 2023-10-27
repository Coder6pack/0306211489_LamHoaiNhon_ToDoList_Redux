import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './toDoList.module.scss'
import { Todo } from '../../@types/todo.type'

export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const doneTodo = todos.filter((val) => val.done)
  const notDoneTodo = todos.filter((val) => !val.done)

  //Edit Todos
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  const startCurrentTodo = (id: string) => {
    const findTodo = todos.find((todo) => todo.id === id)
    if (findTodo) {
      setCurrentTodo(findTodo)
    }
  }

  const editCurrentTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }

  const endEditCurrentTodo = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
  }

  // Delete Todo
  const deleteTodo = (id: string) => {
    const findId = todos.find((todo) => todo.id === id)
    const handler = (todoObj: Todo[]) => {
      return todoObj.filter((todo) => todo.id !== findId?.id)
    }
    setTodos(handler)
  }

  //Add Tod
  return (
    <div className={styles.ToDoList}>
      <div className={styles.ToDoListContainer}>
        <TaskInput />
        <TaskList />
      </div>
    </div>
  )
}
