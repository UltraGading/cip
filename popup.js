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

function saveResourceAllocation() { //capital allocation(2)
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

document.addEventListener('DOMContentLoaded', () => { //tracking(3)
  document.getElementById('trackButton').addEventListener('click', () => {
    const resource_id = document.getElementById('resourceId').value;
    const quantity_used = document.getElementById('quantityUsed').value;
    chrome.runtime.sendMessage({ action: 'trackUsage', data: { resource_id, quantity_used } });
  });
});

document.addEventListener('DOMContentLoaded', () => { //budgeting(4)
  // Display current budget
  chrome.storage.local.get('budget', (data) => {
    const budgetDisplay = document.getElementById('budgetDisplay');
    budgetDisplay.textContent = `Current Budget: ${data.budget || 0}`;
  });

  // Add button click event
  document.getElementById('addButton').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amountInput').value);
    if (!isNaN(amount)) {
      updateBudget(amount);
      location.reload(); // Refresh popup to update budget display
    }
  });

  // Subtract button click event
  document.getElementById('subtractButton').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amountInput').value);
    if (!isNaN(amount)) {
      updateBudget(-amount); // Subtracting amount
      location.reload(); // Refresh popup to update budget display
    }
  });
});
//analytics (might require Chart.js)
// Sample data for demonstration purposes
const projectData = [
  { project: 'Project A', tasksCompleted: 20, tasksPending: 5 },
  { project: 'Project B', tasksCompleted: 15, tasksPending: 10 },
  { project: 'Project C', tasksCompleted: 25, tasksPending: 3 },
];
// Function to generate a bar chart using Chart.js
function generateBarChart(data) {
  const labels = data.map(item => item.project);
  const completedTasks = data.map(item => item.tasksCompleted);
  const pendingTasks = data.map(item => item.tasksPending);

  const ctx = document.getElementById('barChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Completed Tasks',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: completedTasks,
        },
        {
          label: 'Pending Tasks',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: pendingTasks,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
// Function to analyze project data and generate insights
function generateInsights(data) {
  const totalCompleted = data.reduce((acc, item) => acc + item.tasksCompleted, 0);
  const totalPending = data.reduce((acc, item) => acc + item.tasksPending, 0);
  const totalTasks = totalCompleted + totalPending;

  const completionRate = (totalCompleted / totalTasks) * 100;
  const pendingRate = (totalPending / totalTasks) * 100;

  console.log(`Completion Rate: ${completionRate.toFixed(2)}%`);
  console.log(`Pending Rate: ${pendingRate.toFixed(2)}%`);
}
// Sample function to initialize reporting and analytics
function initializeReporting() {
  generateBarChart(projectData);
  generateInsights(projectData);
}
// Call the initialization function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeReporting);
