import React from 'react';

type LocalStateType = {
    isHidden: boolean
};

type OwnPropsType = {
    filterValue: string
    changeFilter: (filterValue: string) => void
};

class TodoListFooter extends React.Component<OwnPropsType, LocalStateType> {
    state: LocalStateType = {
        isHidden: false
    };

    onAllFilterClick = () => this.props.changeFilter('All');
    onCompletedFilterClick = () => this.props.changeFilter('Completed');
    onActiveFilterClick = () => this.props.changeFilter('Active');

    onShowFiltersClick = () => this.setState({isHidden: false});
    onHideFiltersClick = () => this.setState({isHidden: true});

    render = () => {
        let classForAll = this.props.filterValue === 'All' ? 'filter-active' : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '';
        let classForActive = this.props.filterValue === 'Active' ? 'filter-active' : '';

        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <span onClick={this.onHideFiltersClick}>hide</span>}
                {this.state.isHidden && <span onClick={this.onShowFiltersClick}>show</span>}
                {
                    !this.state.isHidden && <div>
                        <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                        <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                        <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                    </div>
                }
            </div>
        );
    };
}

export default TodoListFooter;