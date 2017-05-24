import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';

import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  clearReminders() {
    this.props.clearReminders();
  }

  renderReminders() {
    const { reminders } = this.props;

    if (reminders.length < 1) {
      return null;
    }

    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(({id, text, dueDate}) => {
            return (
              <li key={id} className="list-group-item">
                <div className="list-item">{text}</div>
                <div><em>{moment(new Date(dueDate)).fromNow()}</em></div>
                <div className="list-item delete-button" onClick={() => this.deleteReminder(id)}>&#x2715;</div>
              </li>
            );
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="I have to"
              onChange={event => this.setState({text: event.target.value})}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.addReminder(event.target.value);
                }
              }}
            />
            <input
              type="datetime-local"
              className="form-control"
              onChange={event => this.setState({dueDate: event.target.value})}
            />
          </div>
          <button
            type="button"
            onClick={() => this.addReminder()}
            className="btn btn-success">
            Add Reminder
          </button>
          { this.renderReminders() }
          <div
            className="btn btn-danger"
            onClick={() => this.clearReminders()}
          >
            Clear reminders
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  (state) => ({
    reminders: state
  }),
  { addReminder, deleteReminder, clearReminders }
)(App);
