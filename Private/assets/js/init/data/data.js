function updateLocalStorage (tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getDataFromLocalStorage() {

    if (localStorage.getItem('tasks')) {
        let tasksFromLocalStorage = localStorage.getItem('tasks');
        tasks = JSON.parse(tasksFromLocalStorage);
    } else {
        tasks = [
            {
                "id": "0",
                "title": "Einkaufen",
                "description": "Brot, Eier, Milch",
                "prio": 4,
                "done": "",
                "createdDate": "2019-06-01",
                "dueDate": "2019-06-30",
                "completedDate": "2011-01-01",
            },
            {
                "id": "1",
                "title": "CodeWar",
                "description": "Level 6 erreichen",
                "prio": 5,
                "done": "",
                "createdDate": "2019-06-02",
                "dueDate": "2019-06-27",
                "completedDate": "2011-01-01",
            },

            {
                "id": "2",
                "title": "Tickets ersteigern",
                "description": "Es gibt nur wenige Tickets, bis 200 CHF",
                "prio": 2,
                "done": "",
                "createdDate": "2019-06-03",
                "dueDate": "2019-06-26",
                "completedDate": "2011-01-01",
            },
        ];

        updateLocalStorage(tasks);

    }
}