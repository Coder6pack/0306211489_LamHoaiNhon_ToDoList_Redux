import { Todo } from '../../@types/todo.type'
import { useSelector } from 'react-redux'
import styles from './taskList.module.scss'
import { RootState } from '../../app/store'
import { useDispatch } from 'react-redux'
import { deleteToDo } from '../../reducer'

export default function TaskList() {
  const listTodo = useSelector((state: RootState) => state.toDoList.toDoList)
  const dispatch = useDispatch()
  const handleDelete = (id: string) => {
    dispatch(deleteToDo(id))
  }
  return (
    <div>
      <h2 className={styles.title}>{'TASK LIST'}</h2>

      {listTodo.map((todo) => (
        <div className={styles.tasks} key={todo.id}>
          <div className={styles.task}>
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.TaskAction}>
              <button className={styles.TaskBtn} onClick={() => handleDelete(todo.id)}>
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
