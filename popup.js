function openPage(evt, name) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}

function viewGroup() {
  var x = document.getElementsByClassName("group-button");
  for(var i = 0; i < x.length; i++){
    x[i].style.display = "none";
  }
  var y = document.getElementsByClassName("group");
  var a = document.getElementsByClassName("tab-button");
  for(var i = 0; i < y.length; i++){
    y[i].style.display = "block";
    for(var i = 0; i < a.length; i++){
      a[i].style.display = "block";
    }
  }
  var b = document.getElementsByClassName("back-button")
  for(var i = 0; i < b.length; i++){
    b[i].style.display = "block";
  }
}

function backtoMenu(){
  var y = document.getElementsByClassName("group");
  var a = document.getElementsByClassName("tab-button");
  for(var i = 0; i < y.length; i++){
    y[i].style.display = "none";
    for(var i = 0; i < a.length; i++){
      a[i].style.display = "none";
    }
  }
  var x = document.getElementsByClassName("group-button");
  for(var i = 0; i < x.length; i++){
    x[i].style.display = "block";
  }
  var b = document.getElementsByClassName("back-button")
  for(var i = 0; i < b.length; i++){
    b[i].style.display = "none";
  }
}

function createWindow() {
  var x = document.getElementById("create-window");
  x.style.display = "block";
}

function exit(){
  var x = document.getElementById("create-window");
  x.style.display = "none";
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
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

