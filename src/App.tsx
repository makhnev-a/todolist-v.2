import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';
import {connect} from "react-redux";
import {createTodolist, loadTodolists} from "./reducer";
import {AppStateType} from "./store";
import {TodoType} from "./types/entities";

type MapStatePropsType = {
    todolists: Array<TodoType>
};

type MapDispatchPropsType = {
    loadTodolists: () => void
    createTodolist: (title: string) => void
};

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => this.props.loadTodolists();
    addTodoList = (title: string) => this.props.createTodolist(title);

    render = () => {
        const todoLists = this.props.todolists.map(todo =>
            <TodoList
                id={todo.id}
                title={todo.title}
                key={todo.id}
                tasks={todo.tasks}
            />
        );

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todoLists}
                </div>
            </>
        )
    };
}

let mapStateToProps = (state: AppStateType) => {
    return {
        todolists: state.todolist.todolists
    };
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    loadTodolists,
    createTodolist
})(App);