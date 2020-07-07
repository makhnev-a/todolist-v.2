import React from 'react';
import TodoListTask from './TodoListTask';
import {TaskType} from "./types/entities";

type OwnPropsType = {
    tasks: Array<TaskType>
    changeStatus: (task: TaskType, status: number) => void
    onTitleChanged: (task: TaskType, title: string) => void
    removeTask: (taskId: string) => void
};

class TodoListTasks extends React.Component<OwnPropsType> {
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