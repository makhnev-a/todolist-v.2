import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import TodoListTitle from './TodoListTitle';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';
import {connect} from "react-redux";

class TodoList extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All'
    };

    nextTaskId = 0;

    componentDidMount() {
        this.restoreState();
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString);
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };

        let stateAsString = localStorage.getItem('our-state-' + this.props.id);

        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1
                }
            });
        });
    };

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        };

        this.props.addTask(newTask, this.props.id);
    };

    removeTask = (taskId) => {
        this.props.removeTask(this.props.id, taskId);
    };

    removeTodolist = () => {
        this.props.removeTodolist(this.props.id);
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => this.saveState());
    };

    filteredTasks = () => {
        return this.props.tasks.filter((task) => {
            if (this.state.filterValue === 'All') {
                return true;
            } else if (this.state.filterValue === 'Completed') {
                return task.isDone === true;
            } else if (this.state.filterValue === 'Active') {
                return task.isDone === false;
            }
        });
    };

    changeTask = (taskId, obj) => this.props.changeTask(this.props.id, taskId, obj);

    changeStatus = (taskId, isDone) => this.changeTask(taskId, {isDone});
    onTitleChanged = (taskId, title) => this.changeTask(taskId, {title});

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle
                            title={this.props.title}
                            removeTodolist={this.removeTodolist}
                        />
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks 
                        tasks={this.filteredTasks()}
                        changeStatus={this.changeStatus}
                        onTitleChanged={this.onTitleChanged}
                        removeTask={this.removeTask}
                    />
                    <TodoListFooter 
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId) {
            const action = {
                type: 'ADD-TASK',
                newTask,
                todolistId
            };

            dispatch(action);
        },
        changeTask(todolistId, taskId, obj) {
            const action = {
                type: 'CHANGE-TASK',
                todolistId,
                taskId,
                obj
            };

            dispatch(action);
        },
        removeTask(todolistId, taskId) {
            const action = {
                type: 'REMOVE-TASK',
                todolistId,
                taskId
            };

            dispatch(action);
        },
        removeTodolist(todolistId) {
            const action = {
                type: 'REMOVE-TODOLIST',
                todolistId
            };

            dispatch(action);
        }
    };
};

export default connect(null, mapDispatchToProps)(TodoList);