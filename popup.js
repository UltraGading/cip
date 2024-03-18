document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("scheduleButton").addEventListener("click", function() {
      let taskName = document.getElementById("taskName").value;
      let startDate = document.getElementById("startDate").value;
      let endDate = document.getElementById("endDate").value;
      let priority = document.getElementById("priority").value;

      let newTask = new Task(taskName, startDate, endDate, priority);
      scheduleTask(newTask);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const saveBtn = document.getElementById('saveBtn');
  saveBtn.addEventListener('click', saveResourceAllocation);
});

function saveResourceAllocation() {
  const tasks = document.querySelectorAll('.task');
  const resourceAllocations = [];

  tasks.forEach(task => {
    const time = parseFloat(task.querySelector('#time').value);
    const budget = parseFloat(task.querySelector('#budget').value);
    const personnel = parseFloat(task.querySelector('#personnel').value);
    
    resourceAllocations.push({ time, budget, personnel });
  });

  // Here, you can update the task data structure with resource allocations
  console.log('Resource allocations:', resourceAllocations);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('trackButton').addEventListener('click', () => {
    const resource_id = document.getElementById('resourceId').value;
    const quantity_used = document.getElementById('quantityUsed').value;
    chrome.runtime.sendMessage({ action: 'trackUsage', data: { resource_id, quantity_used } });
  });
});