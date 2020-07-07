import {api} from "./api";
import {TaskType, TodoType} from "./types/entities";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";

export const ADD_TODOLIST = 'Todolist/Reducer/ADD-TODOLIST';
export const ADD_TASK = 'Todolist/Reducer/ADD-TASK';
export const CHANGE_TASK = 'Todolist/Reducer/CHANGE-TASK';
export const REMOVE_TASK = 'Todolist/Reducer/REMOVE-TASK';
export const REMOVE_TODOLIST = 'Todolist/Reducer/REMOVE-TODOLIST';
export const SET_TODOLIST = 'Todolist/Reducer/SET-TODOLIST';
export const SET_TASKS = 'Todolist/Reducer/SET-TASKS';
export const UPDATE_TITLE_TODOLIST = 'Todolist/Reducer/UPDATE_TITLE_TODOLIST';

type InitialStateType = {
    todolists: Array<TodoType>
}

const initialState: InitialStateType = {
    todolists: []
};

export const reducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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
type ActionsType = AddTodolistAcType
    | AddTaskAcType
    | ChangeTaskAcType
    | RemoveTaskAcType
    | RemoveTodolistAcType
    | SetTodolistAcType
    | SetTasksAcType
    | UpdateTitleTodolistAcType;

type AddTodolistAcType = {
    type: typeof ADD_TODOLIST
    newTodolist: TodoType
};
export const addTodolistAc = (newTodolist: TodoType): AddTodolistAcType => {
    return {
        type: ADD_TODOLIST,
        newTodolist
    };
};

type AddTaskAcType = {
    type: typeof ADD_TASK
    newTask: TaskType
    todolistId: string
};
export const addTaskAc = (newTask: TaskType, todolistId: string): AddTaskAcType => {
    return {
        type: ADD_TASK,
        newTask,
        todolistId
    };
};

type ChangeTaskAcType = {
    type: typeof CHANGE_TASK
    task: TaskType
};
export const changeTaskAc = (task: TaskType): ChangeTaskAcType => {
    return {
        type: CHANGE_TASK,
        task
    };
};

type RemoveTaskAcType = {
    type: typeof REMOVE_TASK
    todolistId: string
    taskId: string
};
export const removeTaskAc = (todolistId: string, taskId: string): RemoveTaskAcType => {
    return {
        type: REMOVE_TASK,
        todolistId,
        taskId
    };
};

type RemoveTodolistAcType = {
    type: typeof REMOVE_TODOLIST
    todolistId: string
};
export const removeTodolistAc = (todolistId: string): RemoveTodolistAcType => {
    return {
        type: REMOVE_TODOLIST,
        todolistId
    };
};

type SetTodolistAcType = {
    type: typeof SET_TODOLIST
    todolists: Array<TodoType>
};
export const setTodolistAc = (todolists: Array<TodoType>): SetTodolistAcType => {
    return {
        type: SET_TODOLIST,
        todolists
    };
};

type SetTasksAcType = {
    type: typeof SET_TASKS
    tasks: Array<TaskType>
    todolistId: string
};
export const setTasksAc = (tasks: Array<TaskType>, todolistId: string): SetTasksAcType => {
    return {
        type: SET_TASKS,
        tasks,
        todolistId
    };
};

type UpdateTitleTodolistAcType = {
    type: typeof UPDATE_TITLE_TODOLIST
    todolistId: string
    title: string
};
export const updateTitleTodolistAc = (todolistId: string, title: string): UpdateTitleTodolistAcType => {
    return {
        type: UPDATE_TITLE_TODOLIST,
        todolistId,
        title
    };
};

// thunks
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>;

export const loadTasks = (todolistId: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        api.getTasks(todolistId).then(res => {
            if (!res.data.error) {
                dispatch(setTasksAc(res.data.items, todolistId));
            }
        });
    };
};

export const createTask = (newText: string, todolistId: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        api.addTask(todolistId, newText).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAc(res.data.data.item, todolistId));
            }
        });
    };
};

export const deleteTask = (taskId: string, todolistId: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        api.deleteTask(todolistId, taskId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAc(todolistId, taskId));
            }
        });
    };
};

export const updateTask = (todolistId: string, task: TaskType): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        api.updateTask(todolistId, task.id, task).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskAc(res.data.data.item));
            }
        });
    };
};

export const loadTodolists = (): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        api.getTodolists().then(res => {
            dispatch(setTodolistAc(res.data));
        });
    };
};

export const createTodolist = (title: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        api.addTodolist(title).then(res => {
            let todolist = res.data.data.item;
            dispatch(addTodolistAc(todolist));
        });
    };
};

export const deleteTodolist = (todolistId: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        api.deleteTodolist(todolistId).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAc(todolistId));
            }
        });
    };
};

export const updateTodolistTitle = (todolistId: string, title: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        api.changeTitleOnTodolist(todolistId, title).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTitleTodolistAc(todolistId, title));
            }
        })
    };
};