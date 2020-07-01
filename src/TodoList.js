import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import TodoListTitle from './TodoListTitle';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';
import {connect} from "react-redux";
import axios from 'axios';
import {addTaskAc, changeTaskAc, removeTaskAc, removeTodolistAc, setTasksAc} from "./reducer";

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
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`, {
            withCredentials: true,
            headers: {'API-KEY': '43c44c71-4889-4c8a-9a5f-3020a8a0ec48'}
        }).then(res => {
            if (!res.data.error) {
                this.props.setTasks(res.data.items, this.props.id);
            }
        });
    };

    _restoreState = () => {
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
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`, {
            title: newText
        }, {
            withCredentials: true,
            headers: {'API-KEY': '43c44c71-4889-4c8a-9a5f-3020a8a0ec48'}
        }).then(res => {
            if (res.data.resultCode === 0) {
                this.props.addTask(res.data.data.item, this.props.id)
            }
        })
    };

    _addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        };

        this.props.addTask(newTask, this.props.id);
    };

    removeTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`, {
            withCredentials: true,
            headers: {'API-KEY': '43c44c71-4889-4c8a-9a5f-3020a8a0ec48'}
        }).then(res => {
            if (res.data.resultCode === 0) {
                this.props.removeTask(this.props.id, taskId);
            }
        });
    };

    // not used
    removeTodolist = () => {
        this.props.removeTodolist(this.props.id);
    };

    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`, {
            withCredentials: true,
            headers: {'API-KEY': '43c44c71-4889-4c8a-9a5f-3020a8a0ec48'}
        }).then(res => {
            if (res.data.resultCode === 0) {
                this.props.removeTodolist(this.props.id)
            }
        });
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => this.saveState());
    };

    filteredTasks = () => {
        let {tasks = []} = this.props;

        return tasks.filter((task) => {
            switch (this.state.filterValue) {
                case 'All': return true;
                case 'Completed': return task.isDone === true;
                case 'Active': return  task.isDone === false;
                default: return false;
            }
        });
    };

    changeTask = (newTask) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${newTask.id}`, newTask, {
            withCredentials: true,
            headers: {'API-KEY': '43c44c71-4889-4c8a-9a5f-3020a8a0ec48'}
        }).then(res => {
            if (res.data.resultCode === 0) {
                this.props.changeTask(res.data.data.item);
            }
        });
    };

    changeStatus = (newTask, isDone) => this.changeTask({...newTask, status: isDone === true ? 2 : 0});
    onTitleChanged = (newTask, title) => {this.changeTask({...newTask, title: title});};

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle
                            title={this.props.title}
                            removeTodolist={this.deleteTodolist}
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
            dispatch(addTaskAc(newTask, todolistId));
        },
        changeTask(task) {
            dispatch(changeTaskAc(task));
        },
        removeTask(todolistId, taskId) {
            dispatch(removeTaskAc(todolistId, taskId));
        },
        removeTodolist(todolistId) {
            dispatch(removeTodolistAc(todolistId));
        },
        setTasks(tasks, todolistId) {
            dispatch(setTasksAc(tasks, todolistId))
        }
    };
};

export default connect(null, mapDispatchToProps)(TodoList);