import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import TodoListTitle from './TodoListTitle';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';
import {connect} from "react-redux";
import {
    addTaskAc,
    changeTaskAc,
    createTaskTc,
    deleteTaskTc,
    deleteTodolistTc,
    loadTasksTc,
    removeTaskAc,
    removeTodolistAc,
    setTasksAc,
    updateTaskTc,
    updateTitleTodolistAc,
    updateTodolistTitleTc
} from "./reducer";

class TodoList extends React.Component {
    state = {
        filterValue: 'All'
    };

    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => {
        this.props.loadTasks(this.props.id);
    };

    addTask = (newText) => {
        this.props.createTask(newText, this.props.id);
    };

    removeTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id);
    };

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id);
    };

    changeTodolistTitle = (newTitle) => {
        this.props.updateTodolistTitle(this.props.id, newTitle);
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
        this.props.updateTask(this.props.id, newTask);
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
        // addTask(newTask, todolistId) {
        //     dispatch(addTaskAc(newTask, todolistId));
        // },
        // changeTask(task) {
        //     dispatch(changeTaskAc(task));
        // },
        // removeTask(todolistId, taskId) {
        //     dispatch(removeTaskAc(todolistId, taskId));
        // },
        // removeTodolist(todolistId) {
        //     dispatch(removeTodolistAc(todolistId));
        // },
        // setTasks(tasks, todolistId) {
        //     dispatch(setTasksAc(tasks, todolistId))
        // },
        // updateTitleTodolist(todolistId, title) {
        //     dispatch(updateTitleTodolistAc(todolistId, title));
        // },
        loadTasks(todolistId) {
            let thunk = loadTasksTc(todolistId);
            dispatch(thunk);
        },
        createTask(newTask, todolistId) {
            let thunk = createTaskTc(newTask, todolistId);
            dispatch(thunk);
        },
        deleteTask(taskId, todolistId) {
            let thunk = deleteTaskTc(taskId, todolistId);
            dispatch(thunk);
        },
        updateTask(todolistId, task) {
            let thunk = updateTaskTc(todolistId, task);
            dispatch(thunk);
        },
        deleteTodolist(todolistId) {
            let thunk = deleteTodolistTc(todolistId);
            dispatch(thunk);
        },
        updateTodolistTitle(todolistId, title) {
            let thunk = updateTodolistTitleTc(todolistId, title);
            dispatch(thunk);
        }
    };
};

export default connect(null, mapDispatchToProps)(TodoList);