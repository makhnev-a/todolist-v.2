import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';
import {connect} from "react-redux";
import {addTodolistAc, setTodolistAc} from "./reducer";
import {api} from "./api";

class App extends React.Component {
    restoreState = () => {
        api.getTodolists().then(res => {
            this.props.setTodolist(res.data)
        });
    };

    addTodoList = (title) => {
        api.addTodolist(title).then(res => {
            let todolist = res.data.data.item;
            this.props.addTodoList(todolist);
        })
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
        addTodoList: (newTodolist) => {
            dispatch(addTodolistAc(newTodolist));
        },
        setTodolist(todolists) {
            dispatch(setTodolistAc(todolists));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);