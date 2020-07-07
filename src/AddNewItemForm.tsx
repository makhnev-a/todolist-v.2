import React, {ChangeEvent, KeyboardEvent} from 'react';

type OwnPropsType = {
    addItem: (newText: string) => void
};

type LocalStateType = {
    error: boolean
    title: string
};

class AddNewItemForm extends React.Component<OwnPropsType, LocalStateType> {
    state: LocalStateType = {
        error: false,
        title: ''
    };

    onAddItemClick = () => {
        let newText = this.state.title;

        if (newText === '') {
            this.setState({error: true});
        } else {
            this.setState({error: false, title: ''});
            this.props.addItem(newText);
        }
    };

    onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        });
    };

    onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    };

    render = () => {
        return (
            <div className="todoList-newTaskForm">
                <input 
                    className={this.state.error ? 'error' : ''}
                    type="text" 
                    placeholder="New task name"
                    onChange={this.onTitleChanged}
                    onKeyPress={this.onKeyPress}
                    value={this.state.title}
                />
                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
}

export default AddNewItemForm;