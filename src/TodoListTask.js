import React from 'react';

class TodoListTask extends React.Component {
    state = {
        editMode: false,
        title: this.props.task.title
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked;
        this.props.changeStatus(this.props.task, status);
    };

    onTitleChanged = (e) => {
        let newTitle = e.currentTarget.value;

        this.setState({title: newTitle});
        this.props.onTitleChanged(this.props.task, newTitle);
    };

    onRemoveTask = () => {
        this.props.removeTask(this.props.task.id);
    };

    showPriority = () => {
        switch (this.props.task.priority) {
            case 0: return 'Low';
            case 1: return 'Middle';
            case 2: return 'High';
            case 3: return 'Urgently';
            case 4: return 'Later'
            default: return this.props.task.priority;
        }
    };

    activeEditMode = () => this.setState({editMode: true});

    dectiveEditMode = () => {
        this.setState({editMode: false});
        this.props.onTitleChanged(this.props.task, this.state.title);
    };

    render = () => {
        return (
            <div className={this.props.task.status === 2 ? 'todoList-task done' : 'todoList-task'}>
                <span>{this.props.taskIndex + 1}</span>
                <input 
                    onChange={this.onIsDoneChanged} 
                    type="checkbox" 
                    checked={this.props.task.status}
                />
                {
                    this.state.editMode 
                        ? <input 
                            autoFocus={true}
                            onBlur={this.dectiveEditMode}
                            onChange={this.onTitleChanged}
                            type='text' 
                            value={this.state.title}
                        /> 
                        : <span onClick={this.activeEditMode}>{this.props.task.title}</span>
                }
                <span>, priority: {this.showPriority}</span>
                <button onClick={this.onRemoveTask}>x</button>
            </div>
        );
    };
}

export default TodoListTask;