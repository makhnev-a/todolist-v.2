import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';

class App extends React.Component {
    state = {
        tasks: [
            {title: 'CSS', isDone: true, priority: 'low'},
            {title: 'JS', isDone: false, priority: 'high'},
            {title: 'React', isDone: false, priority: 'low'},
            {title: 'Patterns', isDone: true, priority: 'high'}
        ],
        filterValue: 'All'
    };

    addTask = (newText) => {
        let newTask = {
            title: newText,
            isDone: true,
            priority: 'low'
        };

        this.setState({
            tasks: [...this.state.tasks, newTask]
        });
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    filteredTasks = () => {
        return this.state.tasks.filter((task) => {
            if (this.state.filterValue === 'All') {
                return true;
            } else if (this.state.filterValue === 'Completed') {
                return true.isDone === true;
            } else if (this.state.filterValue === 'Active') {
                return true.isDone === false;
            }
        });
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t === task) {
                return {...t, isDone: isDone};
            }

            return t;
        });

        this.setState({
            tasks: newTasks
        });
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks 
                        tasks={this.filteredTasks()}
                        changeStatus={this.changeStatus}
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

export default App;