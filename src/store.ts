import {applyMiddleware, combineReducers, createStore} from "redux";
import {reducer} from "./reducer";
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    todolist: reducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;