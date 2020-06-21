import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.newTaskTitleRef = React.createRef();
    }
    
    state = {
        tasks: [
            {title: 'CSS', isDone: true, priority: 'low'},
            {title: 'JS', isDone: false, priority: 'high'},
            {title: 'React', isDone: false, priority: 'low'},
            {title: 'Patterns', isDone: true, priority: 'high'}
        ],
        filterValue: 'Completed'
    };

    onAddTaskClick = () => {
        let newText = this.newTaskTitleRef.current.value;
        let newTask = {
            title: newText,
            isDone: true,
            priority: 'low'
        };

        this.setState({
            tasks: [...this.state.tasks, newTask]
        });

        this.newTaskTitleRef.current.value = '';
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    {/* <TodoListHeader /> */}
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                            <button onClick={this.onAddTaskClick}>Add</button>
                        </div>
                    </div>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;