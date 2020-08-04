import React,{Component} from 'react';
import { connect } from 'react-redux';
import { addReminder,deleteReminder,clearReminder } from './actions';
import './index.css';
import moment from 'moment';



class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            text : '',
            dueDate : ''
        }
    }

    addReminder() {
//         console.log("this",this);
        this.props.addReminder(this.state.text,this.state.dueDate);
        console.log('this.props',this.props);
    }

    deleteReminder(id) {
      this.props.deleteReminder(id);
    }

    clearReminders() {
      this.props.clearReminder();
    }

    renderReminders() {
        const {reminders} =this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">{reminder.text} <em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                                <div className="list-item delete-button" onClick={() => this.deleteReminder(reminder.id)}>&#x2715;</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
       // console.log('this.props',this.props);
        return (
            <div className="App">
                <div className="title">
                    Reminder App
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="I have to ..."
                            onChange={event => this.setState({text : event.target.value})}
                        />
                        <input
                            type="date"
                            className="form-control"
                            onChange={event => this.setState({dueDate : event.target.value})}
                        />
                    </div>
                    <button type="button" className="btn btn-success" onClick={() => this.addReminder()}>
                      Add Reminder
                    </button>
                </div>
              {this.renderReminders()}
              <button type="button" className="btn btn-danger" onClick={() => this.clearReminders()}>Clear All</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
//    console.log('state',state);
    return {
        reminders : state
    }
}

export default connect(mapStateToProps,{ addReminder , deleteReminder, clearReminder })(App);
