// redux/actions.js
import { 
  ADD_TODO,

  FILTER_FOCUS_TURN_ON,
  FILTER_FOCUS_TURN_OFF,
  FILTER_FOCUS_TOGGLE
} from './actionTypes'

let nextTodoId = 0
export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
})

export const toggleFilterFocus = () => {

}