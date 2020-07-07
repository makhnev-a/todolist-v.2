import axios from 'axios';
import {TaskType, TodoType} from "./types/entities";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': '43c44c71-4889-4c8a-9a5f-3020a8a0ec48'}
});

type CreateTodoType = {
    resultCode: number
    messages: Array<string>,
    data: {
        item: TodoType
    }
};

type EmptyResponseType = {
    resultCode: number
    messages: Array<string>,
    data: {}
};

type GetTasksType = {
    error: string
    totalCount: number
    items: Array<TaskType>
};

type OneTaskType = {
    data: {
        item: TaskType
    }
    messages: Array<string>
    resultCode: number
};

export const api = {
    getTodolists() {
        return instance.get('');
    },
    addTodolist(title: string) {
        return instance.post<CreateTodoType>('', {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<EmptyResponseType>(`/${todolistId}`);
    },
    changeTitleOnTodolist(todolistId: string, title: string) {
        return instance.put<EmptyResponseType>(`${todolistId}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`/${todolistId}/tasks`);
    },
    addTask(todolistId: string, title: string) {
        return instance.post<OneTaskType>(`/${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<EmptyResponseType>(`/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, newTask: TaskType) {
        return instance.put<OneTaskType>(`/${todolistId}/tasks/${taskId}`, newTask);
    }
};