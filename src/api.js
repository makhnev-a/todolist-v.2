import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': '43c44c71-4889-4c8a-9a5f-3020a8a0ec48'}
});

export const api = {
    getTodolists() {
        return instance.get('');
    },
    addTodolist(title) {
        return instance.post('', {title});
    },
    deleteTodolist(todolistId) {
        return instance.delete(`/${todolistId}`);
    },
    changeTitleOnTodolist(todolistId, title) {
        return instance.put(`${todolistId}`, {title});
    },
    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`);
    },
    addTask(todolistId, title) {
        return instance.post(`/${todolistId}/tasks`, {title});
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId, taskId, newTask) {
        return instance.put(`/${todolistId}/tasks/${taskId}`, newTask);
    }
};