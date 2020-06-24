import {createStore} from "redux";

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };
        case 'ADD-TASK':
            return {
                ...state, todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]};
                    }

                    return tl;
                })
            };
        case 'CHANGE-TASK':
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
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;