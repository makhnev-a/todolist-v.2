import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import TodoListTitle from './TodoListTitle';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';
import {connect} from "react-redux";
import {createTask, deleteTask, deleteTodolist, loadTasks, updateTask, updateTodolistTitle} from "./reducer";

class TodoList extends React.Component {
    state = {
        filterValue: 'All'
    };

    componentDidMount() {
        this.restoreState();
    };

    // get all tasks
    restoreState = () => this.props.loadTasks(this.props.id);
    addTask = (newText) => this.props.createTask(newText, this.props.id);
    removeTask = (taskId) => this.props.deleteTask(taskId, this.props.id);

    deleteTodolist = () => this.props.deleteTodolist(this.props.id);
    changeTodolistTitle = (newTitle) => this.props.updateTodolistTitle(this.props.id, newTitle);

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue});
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

    changeTask = (newTask) => this.props.updateTask(this.props.id, newTask);

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

export default connect(null, {
    loadTasks,
    createTask,
    deleteTask,
    updateTask,
    deleteTodolist,
    updateTodolistTitle
})(TodoList);