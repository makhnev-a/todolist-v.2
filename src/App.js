import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListFooter from './TodoListFooter';
import TodoListTasks from './TodoListTasks';

class App extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All'
    };

    nextTaskId = 0;

    componentDidMount() {
        this.restoreState();
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state', stateAsString);
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };

        let stateAsString = localStorage.getItem('our-state');

        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1
                }
            });
        });
    };

    addTask = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        };

        this.nextTaskId++;
        this.setState({
            tasks: [...this.state.tasks, newTask]
        }, () => this.saveState());
        
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => this.saveState());
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

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id === taskId) {
                return {...t, ...obj};
            }

            return t;
        });

        this.setState({tasks: newTasks}, () => this.saveState());
    };

    changeStatus = (taskId, isDone) => this.changeTask(taskId, {isDone});
    onTitleChanged = (taskId, title) => this.changeTask(taskId, {title});

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks 
                        tasks={this.filteredTasks()}
                        changeStatus={this.changeStatus}
                        onTitleChanged={this.onTitleChanged}
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