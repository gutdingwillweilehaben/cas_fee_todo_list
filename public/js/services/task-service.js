import { httpService } from './http-service.js'

class TaskService {
    async createTask(formDataString) {
        return await httpService.ajax("POST", "/tasks/", { name: formDataString });
    }

    async getTasks(sortBy, sortDirection, filtered) {
        return await httpService.ajax("GET", `/tasks?sort=${sortBy}&sortDirection=${sortDirection}&filtered=${filtered}`);
    }

    async getTask(id) {
        return await httpService.ajax("GET", `/tasks/${id}`, undefined);
    }

    async updateTask(id, formDataString) {
        return await httpService.ajax("PUT", `/tasks/${id}`, { name: formDataString });
    }

    async deleteTask(id) {
        return await httpService.ajax("DELETE", `/tasks/${id}`, undefined);
    }
}

export const taskService = new TaskService();