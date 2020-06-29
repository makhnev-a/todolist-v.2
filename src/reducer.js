export const ADD_TODOLIST = 'Todolist/Reducer/ADD-TODOLIST';
export const ADD_TASK = 'Todolist/Reducer/ADD-TASK';
export const CHANGE_TASK = 'Todolist/Reducer/CHANGE-TASK';
export const REMOVE_TASK = 'Todolist/Reducer/REMOVE-TASK';
export const REMOVE_TODOLIST = 'Todolist/Reducer/REMOVE-TODOLIST';
export const SET_TODOLIST = 'Todolist/Reducer/SET-TODOLIST';
export const SET_TASKS = 'Todolist/Reducer/SET-TASKS';

const initialState = {
    todolists: [
        {
            id: 1, title: "list", tasks: [
                {"id": 0, "title": "jkj", "isDone": true, "priority": "low"}
            ]
        },
        {
            id: 2, title: "list2", tasks: [
                {
                    "id": 0,
                    "title": "task1",
                    "isDone": true,
                    "priority": "low"
                },
                {
                    "id": 1,
                    "title": "task2",
                    "isDone": false,
                    "priority": "low"
                }
            ]
        },
        {
            id: 3, title: "list3", tasks: [
                {
                    "id": 0,
                    "title": "task1",
                    "isDone": false,
                    "priority": "low"
                },
                {
                    "id": 1,
                    "title": "task2",
                    "isDone": true,
                    "priority": "low"
                }
            ]
        }
    ]
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {
                            ...tl, tasks: tl.tasks.map(task => {
                                if (task.id === action.taskId) {
                                    return {...task, ...action.obj};
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

export const changeTaskAc = (todolistId, taskId, obj) => {
    return {
        type: CHANGE_TASK,
        todolistId,
        taskId,
        obj
    };
};

export const removeTaskAc = (todolistId, taskId) => {
    debugger
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