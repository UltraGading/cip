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