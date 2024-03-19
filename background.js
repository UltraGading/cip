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
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'trackUsage') {
      // Send a message to the content script to track resource usage
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'trackUsage', data: message.data });
      });
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get('budget', (data) => {
      if (!data.budget) {
        chrome.storage.local.set({ 'budget': 0 });
      }
    });
  });

function updateBudget(amount) {
    chrome.storage.local.get('budget', (data) => {
      let currentBudget = data.budget || 0;
      currentBudget += amount;
      chrome.storage.local.set({ 'budget': currentBudget });
    });
}
  