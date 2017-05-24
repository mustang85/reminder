import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';

import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
  const { dueDate, text } = action;
  return {
    text,
    dueDate,
    id: Math.random()
  }
}

const removeById = (state = [], id) => {
  return state.filter(item => item.id !== id)
}

const reminders = (state = [], action) => {
  let reminders = null;
  state = read_cookie('reminders');
  switch(action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      bake_cookie('reminders', reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      bake_cookie('reminders', reminders);
      return reminders;
    case CLEAR_REMINDERS:
      reminders = [];
      bake_cookie('reminders', reminders);
      return reminders;
    default:
      return state;
  }
}

export default reminders;
