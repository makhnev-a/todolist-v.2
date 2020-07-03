import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';
import {connect} from "react-redux";
import {addTodolistAc, setTodolistAc} from "./reducer";
import {api} from "./api";

class App extends React.Component {
    state = {
        todolists: [
            {id: 1, title: 'list1'},
            {id: 2, title: 'list2'}
        ]
    };

    nextTaskId = 0;

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('todolists', stateAsString);
    };

    restoreState = () => {
        api.getTodolists().then(res => {
            this.props.setTodolist(res.data)
        });
    };

    // restoreState = () => {
    //     let state = {
    //         todolists: []
    //     };
    //
    //     let stateAsString = localStorage.getItem('todolists');
    //
    //     if (stateAsString !== null) {
    //         state = JSON.parse(stateAsString);
    //     }
    //
    //     this.setState(state, () => {
    //         this.state.todolists.forEach(todo => {
    //             if (todo.id >= this.nextTaskId) {
    //                 this.nextTaskId = todo.id + 1
    //             }
    //         });
    //     });
    // };

    addTodoList = (title) => {
        api.addTodolist(title).then(res => {
            let todolist = res.data.data.item;
            this.props.addTodoList(todolist);
        })
    };

    _addTodoList = (title) => {
        let newTodoList = {
            id: this.state.todolists.length + 1,
            title
        };

        this.setState({todolists: [...this.state.todolists, newTodoList]}, () => {
            this.saveState();
        });
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