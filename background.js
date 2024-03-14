class Task {
    constructor(name, startDate, endDate, priority, budget) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.budget = budget;
    }
}
function scheduleTask(newTask) {
    chrome.storage.sync.get("tasks", function(data) {
        let tasks = data.tasks || [];
        for (let task of tasks) {
            if (newTask.startDate < task.endDate && newTask.endDate > task.startDate) {
                console.log("Task overlaps with existing task:", task.name);
                return;
            }
        }
        tasks.push(newTask);
        chrome.storage.sync.set({ "tasks": tasks }, function() {
            console.log("Task scheduled successfully!");
        });
    });
}
export let tasks;