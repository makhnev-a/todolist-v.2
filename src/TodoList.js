import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import TodoListTitle from './TodoListTitle';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';
import {connect} from "react-redux";
import {addTaskAc, changeTaskAc, removeTaskAc, removeTodolistAc, setTasksAc, updateTitleTodolistAc} from "./reducer";
import {api} from "./api";

class TodoList extends React.Component {
    state = {
        filterValue: 'All'
    };

    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => {
        api.getTasks(this.props.id).then(res => {
            if (!res.data.error) {
                this.props.setTasks(res.data.items, this.props.id);
            }
        });
    };

    addTask = (newText) => {
        api.addTask(this.props.id, newText).then(res => {
            if (res.data.resultCode === 0) {
                this.props.addTask(res.data.data.item, this.props.id)
            }
        })
    };

    removeTask = (taskId) => {
        api.deleteTask(this.props.id, taskId).then(res => {
            if (res.data.resultCode === 0) {
                this.props.removeTask(this.props.id, taskId);
            }
        });
    };

    deleteTodolist = () => {
        api.deleteTodolist(this.props.id).then(res => {
            if (res.data.resultCode === 0) {
                this.props.removeTodolist(this.props.id)
            }
        });
    };

    changeTodolistTitle = (newTitle) => {
        api.changeTitleOnTodolist(this.props.id, newTitle).then(res => {
            if (res.data.resultCode === 0) {
                this.props.updateTitleTodolist(this.props.id, newTitle);
            }
        })
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
                case 'All':
                    return true;
                case 'Completed':
                    return task.isDone === true;
                case 'Active':
                    return task.isDone === false;
                default:
                    return false;
            }
        });
    };

    changeTask = (newTask) => {
        api.updateTask(this.props.id, newTask.id, newTask).then(res => {
            if (res.data.resultCode === 0) {
                this.props.changeTask(res.data.data.item);
            }
        });
    };

    changeStatus = (newTask, isDone) => this.changeTask({...newTask, status: isDone === true ? 2 : 0});
    onTitleChanged = (newTask, title) => this.changeTask({...newTask, title: title});

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle
                            title={this.props.title}
                            removeTodolist={this.deleteTodolist}
                            changeTodolistTitle={this.changeTodolistTitle}
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
        },
        updateTitleTodolist(todolistId, title) {
            dispatch(updateTitleTodolistAc(todolistId, title));
        }
    };
};

export default connect(null, mapDispatchToProps)(TodoList);