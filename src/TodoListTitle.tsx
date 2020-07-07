import React, {ChangeEvent} from 'react';

type LocalStateType = {
    editMode: boolean
    title: string
};

type OwnPropsType = {
    title: string
    removeTodolist: () => void
    changeTodolistTitle: (newTitle: string) => void
};

class TodoListTitle extends React.Component<OwnPropsType, LocalStateType> {
    state = {
        editMode: false,
        title: this.props.title
    };

    onRemoveTodolist = () => {
        this.props.removeTodolist();
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value;
        this.setState({title: newTitle});
    };

    onSpanClick = () => {
        this.setState({editMode: true})
    };

    onInputDeactivate = () => {
        this.setState({editMode: false})
        this.props.changeTodolistTitle(this.state.title);
    };

    render = () => {
        return (
            <h3 className="todoList-header__title">
                {
                    this.state.editMode
                        ? <input
                            type={'text'}
                            value={this.state.title}
                            onChange={this.onTitleChanged}
                            onBlur={this.onInputDeactivate}
                            autoFocus={true}
                        />
                        : <>
                            <span onClick={this.onSpanClick}>{this.state.title}</span>
                            <button onClick={this.onRemoveTodolist}>x</button>
                        </>
                }
            </h3>
        );
    };
}

export default TodoListTitle;