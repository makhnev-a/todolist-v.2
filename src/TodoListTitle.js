import React from 'react';

class TodoListTitle extends React.Component {
    onRemoveTodolist = () => {
        this.props.removeTodolist();
    };

    render = () => {
        return (
            <h3 className="todoList-header__title">
                {this.props.title}
                <button onClick={this.onRemoveTodolist}>x</button>
            </h3>

        );
    };
}

export default TodoListTitle;