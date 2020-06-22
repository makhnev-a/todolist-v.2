import React from 'react';

class TodoListHeader extends React.Component {
    constructor(props) {
        super(props);
        
        this.newTaskTitleRef = React.createRef();
    }

    state = {
        error: false,
        title: ''
    };

    onAddTaskClick = (e) => {
        let newText = this.state.title;

        if (newText === '') {
            this.setState({error: true});
        } else {
            this.setState({error: false, title: ''});
            this.props.addTask(newText);
        }
    };

    onTaskClickEnter = (e) => {
        if (e.key === 'Enter') {
            this.onAddTaskClick();
        }
    };

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input 
                        className={this.state.error ? 'error' : ''}
                        // ref={this.newTaskTitleRef} 
                        type="text" 
                        placeholder="New task name"
                        onChange={(e) => {this.setState({error: false, title: e.currentTarget.value})}}
                        onKeyPress={this.onTaskClickEnter}
                        value={this.state.title}
                    />
                    <button onClick={this.onAddTaskClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;