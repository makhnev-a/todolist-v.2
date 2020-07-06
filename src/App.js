import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';
import {connect} from "react-redux";
import {createTodolist, loadTodolists} from "./reducer";

class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    };

    restoreState = () => this.props.loadTodolists();
    addTodoList = (title) => this.props.createTodolist(title);

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

let mapStateToProps = (state) => {
    return {
        todolists: state.todolists.todolists
    };
};

export default connect(mapStateToProps, {
    loadTodolists,
    createTodolist
})(App);