export default class TaskService {


    async getUserTasks() {
        // TODO ближайшие задачи:
        // рендер всех задач на фронте
        // обработка добавления/удаления/редактирования таски
    }

    async createTask(title, details, isFinished) {
        await fetch("api/v1/tasks", {
            method: "POST",
            headers: {
                Authorization: JSON.parse(localStorage.getItem("accesstoken"))
            },
            body: JSON.stringify(title, details, isFinished),
        });
    }

    async deleteTask() {
        await fetch(`api/v1/task/{$id}`, {
           method: "DELETE",
           headers: {
               Authorization: JSON.parse(localStorage.getItem("accesstoken"))
           },
        });
    }

    async editTask() {

    }

    async getTask() {

    }
}