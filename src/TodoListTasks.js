import React from 'react';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {
        let taskElements = this.props.tasks.map(task => 
            <TodoListTask 
                task={task}
                changeStatus={this.props.changeStatus}
            />);

        return (
            <div className="todoList-tasks">
                {taskElements}
            </div>
        );
    };
}

export default TodoListTasks;