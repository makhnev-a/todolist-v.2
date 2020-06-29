import React from 'react';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {
        let taskElements = this.props.tasks.map((task, index) =>
            <TodoListTask 
                task={task}
                taskIndex={index}
                key={task.id}
                changeStatus={this.props.changeStatus}
                onTitleChanged={this.props.onTitleChanged}
                removeTask={this.props.removeTask}
            />);

        return (
            <div className="todoList-tasks">
                {taskElements}
            </div>
        );
    };
}

export default TodoListTasks;