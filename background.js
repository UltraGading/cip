class Task {
    constructor(name, startDate, endDate, priority, budget) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.budget = budget;
    }
}
function scheduleTask(newTask) { //task scheduler(1)
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
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { //tracking(3)
    if (message.action === 'trackUsage') {
      // Send a message to the content script to track resource usage
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'trackUsage', data: message.data });
      });
    }
});
chrome.runtime.onInstalled.addListener(() => { //budgeting(4)
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
function startTask(taskName) { //timer(5)
  if (!taskTimeTracker.hasOwnProperty(taskName)) {
      taskTimeTracker[taskName] = {
          startTime: new Date().getTime(),
          totalTime: 0,
          alarmName: taskName + "_alarm"
      };
      chrome.alarms.create(taskTimeTracker[taskName].alarmName, { delayInMinutes: 1, periodInMinutes: 1 });
      console.log(`Started tracking time for task: ${taskName}`);
  } else {
      console.log(`Task "${taskName}" is already being tracked.`);
  }
}
// Function to stop tracking time for a task
function stopTask(taskName) {
  if (taskTimeTracker.hasOwnProperty(taskName)) {
      let endTime = new Date().getTime();
      let startTime = taskTimeTracker[taskName].startTime;
      let elapsedTime = endTime - startTime; // Time elapsed in milliseconds
      taskTimeTracker[taskName].totalTime += elapsedTime;
      chrome.alarms.clear(taskTimeTracker[taskName].alarmName);
      console.log(`Stopped tracking time for task: ${taskName}`);
      console.log(`Total time spent on task "${taskName}": ${formatTime(taskTimeTracker[taskName].totalTime)}`);
      delete taskTimeTracker[taskName];
  } else {
      console.log(`Task "${taskName}" is not being tracked.`);
  }
}

// Function to format time in hours, minutes, and seconds
function formatTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Event listener for alarm triggered
chrome.alarms.onAlarm.addListener(function(alarm) {
  let taskName = alarm.name.split("_")[0];
  let startTime = taskTimeTracker[taskName].startTime;
  let elapsedTime = new Date().getTime() - startTime;
  taskTimeTracker[taskName].totalTime += elapsedTime;
  taskTimeTracker[taskName].startTime = new Date().getTime();
});
  