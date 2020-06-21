import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';

class App extends React.Component {
    tasks = [
        {title: 'CSS', isDone: true, priority: 'low'},
        {title: 'JS', isDone: false, priority: 'high'},
        {title: 'React', isDone: false, priority: 'low'},
        {title: 'Patterns', isDone: true, priority: 'high'}
    ];

    filterValue = 'Completed';

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks tasks={this.tasks}/>
                    <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;