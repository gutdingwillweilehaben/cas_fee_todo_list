function updateLocalStorage (tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getDataFromLocalStorage() {

    if (localStorage.getItem('tasks')) {
        let tasksFromLocalStorage = localStorage.getItem('tasks');

        tasks = JSON.parse(tasksFromLocalStorage);

        updateLocalStorage(tasks);


    } else {
        tasks = [
            {
                "id": "1",
                "title": "Einkaufen",
                "description": "Brot, Eier, Milch",
                "prio": 4,
                "done": "checked",
                "createdDate": "2019-06-01",
                "dueDate": "2019-06-30",
                "completedDate": "2019-06-20",
            },
            {
                "id": "2",
                "title": "CodeWar",
                "description": "Level 6 erreichen",
                "prio": 5,
                "done": "",
                "createdDate": "2019-06-02",
                "dueDate": "2019-06-27",
                "completedDate": "",
            },
            {
                "id": "3",
                "title": "Tickets ersteigern",
                "description": "Es gibt nur wenige Tickets, bis 200 CHF",
                "prio": 2,
                "done": "",
                "createdDate": "2019-06-03",
                "dueDate": "2019-06-26",
                "completedDate": "",
            },
            {
                "id": "4",
                "title": "Einkaufen",
                "description": "Brot, Eier, Milch",
                "prio": 4,
                "done": "checked",
                "createdDate": "2019-06-01",
                "dueDate": "2019-06-30",
                "completedDate": "2019-06-18",
            },
            {
                "id": "5",
                "title": "CodeWar",
                "description": "Level 6 erreichen",
                "prio": 5,
                "done": "",
                "createdDate": "2019-06-02",
                "dueDate": "2019-06-27",
                "completedDate": "",
            },
            {
                "id": "6",
                "title": "Tickets ersteigern",
                "description": "Es gibt nur wenige Tickets, bis 200 CHF",
                "prio": 2,
                "done": "",
                "createdDate": "2019-06-03",
                "dueDate": "2019-06-26",
                "completedDate": "",
            },
            {
                "id": "7",
                "title": "Einkaufen",
                "description": "Brot, Eier, Milch",
                "prio": 4,
                "done": "checked",
                "createdDate": "2019-06-01",
                "dueDate": "2019-06-30",
                "completedDate": "2018-06-18",
            },
            {
                "id": "8",
                "title": "CodeWar",
                "description": "Level 6 erreichen",
                "prio": 5,
                "done": "",
                "createdDate": "2019-06-02",
                "dueDate": "2019-06-27",
                "completedDate": "",
            },
            {
                "id": "9",
                "title": "Tickets ersteigern",
                "description": "Es gibt nur wenige Tickets, bis 200 CHF",
                "prio": 2,
                "done": "",
                "createdDate": "2019-06-03",
                "dueDate": "2019-06-26",
                "completedDate": "",
            }
        ];

        updateLocalStorage(tasks);
    }
}