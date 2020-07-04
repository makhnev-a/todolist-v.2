import {api} from "./api";

export const ADD_TODOLIST = 'Todolist/Reducer/ADD-TODOLIST';
export const ADD_TASK = 'Todolist/Reducer/ADD-TASK';
export const CHANGE_TASK = 'Todolist/Reducer/CHANGE-TASK';
export const REMOVE_TASK = 'Todolist/Reducer/REMOVE-TASK';
export const REMOVE_TODOLIST = 'Todolist/Reducer/REMOVE-TODOLIST';
export const SET_TODOLIST = 'Todolist/Reducer/SET-TODOLIST';
export const SET_TASKS = 'Todolist/Reducer/SET-TASKS';
export const UPDATE_TITLE_TODOLIST = 'Todolist/Reducer/UPDATE_TITLE_TODOLIST';

const initialState = {
    todolists: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TITLE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, title: action.title};
                    } else {
                        return tl;
                    }
                })
            };
        case SET_TODOLIST:
            return {
                ...state, todolists: action.todolists.map(todo => ({...todo, tasks: []}))
            };
        case SET_TASKS:
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo;
                    } else {
                        return {
                            ...todo, tasks: action.tasks
                        }
                    }
                })
            };
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };
        case ADD_TASK:
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]};
                    }

                    return tl;
                })
            };
        case CHANGE_TASK:
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if (tl.id !== action.task.todoListId) {
                        return tl;
                    } else {
                        return {
                            ...tl, tasks: tl.tasks.map(task => {
                                if (task.id === action.task.id) {
                                    return action.task;
                                } else {
                                    return task;
                                }
                            })
                        }
                    }
                })
            };
        case REMOVE_TASK:
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {
                            ...tl, tasks: tl.tasks.filter(task => task.id !== action.taskId)
                        };
                    }
                })
            };
        case REMOVE_TODOLIST:
            return {
                ...state, todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };
        default:
            return state;
    }
};

// AC
export const addTodolistAc = (newTodolist) => {
    return {
        type: ADD_TODOLIST,
        newTodolist
    };
};

export const addTaskAc = (newTask, todolistId) => {
    return {
        type: ADD_TASK,
        newTask,
        todolistId
    };
};

export const changeTaskAc = (task) => {
    return {
        type: CHANGE_TASK,
        task
    };
};

export const removeTaskAc = (todolistId, taskId) => {
    return {
        type: REMOVE_TASK,
        todolistId,
        taskId
    };
};

export const removeTodolistAc = (todolistId) => {
    return {
        type: REMOVE_TODOLIST,
        todolistId
    };
};

export const setTodolistAc = (todolists) => {
    return {
        type: SET_TODOLIST,
        todolists
    };
};

export const setTasksAc = (tasks, todolistId) => {
    return {
        type: SET_TASKS,
        tasks,
        todolistId
    };
};

export const updateTitleTodolistAc = (todolistId, title) => {
    return {
        type: UPDATE_TITLE_TODOLIST,
        todolistId,
        title
    };
};

// thunks
export const loadTasksTc = (todolistId) => {
    return (dispatch) => {
        api.getTasks(todolistId).then(res => {
            if (!res.data.error) {
                dispatch(setTasksAc(res.data.items, todolistId));
            }
        });
    };
};

export const createTaskTc = (newText, todolistId) => {
    return (dispatch) => {
        api.addTask(todolistId, newText).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAc(res.data.data.item, todolistId));
            }
        });
    };
};

export const deleteTaskTc = (taskId, todolistId) => {
    return (dispatch) => {
        api.deleteTask(todolistId, taskId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAc(todolistId, taskId));
            }
        });
    };
};

export const updateTaskTc = (todolistId, task) => {
    return (dispatch) => {
        api.updateTask(todolistId, task.id, task).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskAc(res.data.data.item));
            }
        });
    };
};

export const loadTodolistsTc = () => {
    return (dispatch) => {
        api.getTodolists().then(res => {
            dispatch(setTodolistAc(res.data));
        });
    };
};

export const createTodolistTc = (title) => {
    return (dispatch) => {
        api.addTodolist(title).then(res => {
            let todolist = res.data.data.item;
            dispatch(addTodolistAc(todolist));
        });
    };
};

export const deleteTodolistTc = (todolistId) => {
    return (dispatch) => {
        api.deleteTodolist(todolistId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAc(todolistId));
            }
        });
    };
};

export const updateTodolistTitleTc = (todolistId, title) => {
    return (dispatch) => {
        api.changeTitleOnTodolist(todolistId, title).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTitleTodolistAc(todolistId, title));
            }
        })
    };
};