import React from 'react';

class TodoListTask extends React.Component {
    state = {
        editMode: false
    };

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked);
    };

    onTitleChanged = (e) => {
        let newTitle = e.currentTarget.value;

        this.props.onTitleChanged(this.props.task.id, newTitle);
    };

    activeEditMode = () => this.setState({editMode: true});
    dectiveEditMode = () => this.setState({editMode: false});

    render = () => {
        return (
            <div className={this.props.task.isDone ? 'todoList-task done' : 'todoList-task'}>
                <span>{this.props.task.id}</span>
                <input 
                    onChange={this.onIsDoneChanged} 
                    type="checkbox" 
                    checked={this.props.task.isDone}
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
                <span>, {this.props.task.priority}</span>
            </div>
        );
    };
}

export default TodoListTask;