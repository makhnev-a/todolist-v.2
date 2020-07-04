import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';
import {connect} from "react-redux";
import {addTodolistAc, createTodolistTc, loadTodolistsTc, setTodolistAc} from "./reducer";
import {api} from "./api";

class App extends React.Component {
    restoreState = () => {
        this.props.loadTodolists();
    };

    addTodoList = (title) => {
        this.props.createTodolist(title);
    };

    componentDidMount() {
        this.restoreState();
    };

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
        todolists: state.todolists,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        // addTodoList: (newTodolist) => {
        //     dispatch(addTodolistAc(newTodolist));
        // },
        // setTodolist(todolists) {
        //     dispatch(setTodolistAc(todolists));
        // },
        loadTodolists() {
            let thunk = loadTodolistsTc();
            dispatch(thunk);
        },
        createTodolist(title) {
            let thunk = createTodolistTc(title);
            dispatch(thunk);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);