import React from 'react';

class TodoListTask extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }
    render = () => {
        return (
            <div className="todoList-task">
                <input type="checkbox" checked={this.props.isDone}/>
                <span>{this.props.title}</span>
                <span>, {this.props.priority}</span>
            </div>
        );
    };
}

export default TodoListTask;