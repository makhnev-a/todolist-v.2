import React from 'react';
import './App.css';
import AddNewItemForm from './AddNewItemForm';
import TodoListTitle from './TodoListTitle';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';
import {connect} from "react-redux";
import {createTask, deleteTask, deleteTodolist, loadTasks, updateTask, updateTodolistTitle} from "./reducer";
import {TaskType} from "./types/entities";
import {AppStateType} from "./store";

type LocalStateType = {
    filterValue: string
};

type MapStatePropsType = {};

type MapDispatchPropsType = {
    loadTasks: (todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void
    updateTask: (todolistId: string, task: TaskType) => void
    deleteTodolist: (todolistId: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
};

type OwnPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class TodoList extends React.Component<PropsType> {
    state: LocalStateType = {
        filterValue: 'All'
    };

    componentDidMount() {
        this.restoreState();
    };

    // get all tasks
    restoreState = () => this.props.loadTasks(this.props.id);
    addTask = (newText: string) => this.props.createTask(newText, this.props.id);
    removeTask = (taskId: string) => this.props.deleteTask(taskId, this.props.id);

    deleteTodolist = () => this.props.deleteTodolist(this.props.id);
    changeTodolistTitle = (newTitle: string) => this.props.updateTodolistTitle(this.props.id, newTitle);

    changeFilter = (newFilterValue: string) => {
        this.setState({filterValue: newFilterValue});
    };

    filteredTasks = () => {
        let {tasks = []} = this.props;

        return tasks.filter((task) => {
            switch (this.state.filterValue) {
                case 'All':
                    return true;
                case 'Completed':
                    return task.status === 2;
                case 'Active':
                    return task.status === 0;
                default:
                    return false;
            }
        });
    };

    changeTask = (newTask: TaskType) => this.props.updateTask(this.props.id, newTask);

    changeStatus = (newTask: TaskType, status: number) => this.changeTask({...newTask, status});
    onTitleChanged = (newTask: TaskType, title: string) => this.changeTask({...newTask, title: title});

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

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(null, {
    loadTasks,
    createTask,
    deleteTask,
    updateTask,
    deleteTodolist,
    updateTodolistTitle
})(TodoList);