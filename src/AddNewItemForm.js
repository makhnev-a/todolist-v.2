import React from 'react';

class AddNewItemForm extends React.Component {
    state = {
        error: false,
        title: ''
    };

    onAddItemClick = (e) => {
        let newText = this.state.title;

        if (newText === '') {
            this.setState({error: true});
        } else {
            this.setState({error: false, title: ''});
            this.props.addItem(newText);
        }
    };

    onKeyPress = (e) => {
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
                    onChange={(e) => {this.setState({error: false, title: e.currentTarget.value})}}
                    onKeyPress={this.onKeyPress}
                    value={this.state.title}
                />
                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
}

export default AddNewItemForm;