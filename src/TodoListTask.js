import React from 'react';

class TodoListTask extends React.Component {
    state = {
        editMode: false
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        this.props.changeStatus(this.props.task.id, status);
    };

    onTitleChanged = (e) => {
        let newTitle = e.currentTarget.value;

        this.props.onTitleChanged(this.props.task.id, newTitle);
    };

    onRemoveTask = () => {
        debugger
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
    dectiveEditMode = () => this.setState({editMode: false});

    render = () => {
        return (
            <div className={this.props.task.status === 2 ? 'todoList-task done' : 'todoList-task'}>
                <span>{this.props.taskIndex}</span>
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
                            value={this.props.task.title}
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