// Initial tasks object for Lionel Messi's training schedule
let lionelMessi = {
    name: "Lionel Messi",
    age: 37,
    club: "Inter Miami",
    trainingSchedule: [
      "Aerobics",
      "Leg work",
      "Breathing exercises",
      "Underwater swimming",
      "One on one dribbling",
      "Finishing",
      "Passing",
      "Shooting",
      "Man marking"
    ]
  };
  
  // Get the elements we need
  let taskList = document.getElementById("task-list");
  let newTaskInput = document.getElementById("new-task-input");
  let addTaskButton = document.getElementById("add-task-btn");
  let taskPrioritySelect = document.getElementById("task-priority");
  let markAllButton = document.getElementById("mark-all-btn");
  
  // Add tasks to the list (either initial ones or dynamically added)
  function createTaskItem(task, priority = "normal", completed = false) {
    let listItem = document.createElement("li");
  
    // Create a priority label (Normal, Urgent, Low)
    let priorityLabel = document.createElement("span");
    priorityLabel.classList.add("priority");
    priorityLabel.textContent = `[${priority}]`;
  
    // Task text
    let taskText = document.createTextNode(task);
  
    // Create checkbox icon (Font Awesome)
    let checkbox = document.createElement("span");
    checkbox.classList.add("fa", completed ? "fa-check-circle" : "fa-circle");
    checkbox.style.marginRight = "10px";
    checkbox.style.cursor = "pointer";
  
    // Toggle task completion
    checkbox.addEventListener("click", function () {
      if (listItem.classList.contains("checked")) {
        listItem.classList.remove("checked");
        checkbox.classList.replace("fa-check-circle", "fa-circle");
      } else {
        listItem.classList.add("checked");
        checkbox.classList.replace("fa-circle", "fa-check-circle");
      }
      saveTasksToLocalStorage();
    });
  
    // Create remove button (Font Awesome trash icon)
    let removeButton = document.createElement("span");
    removeButton.classList.add("fa", "fa-trash", "remove-btn");
    removeButton.addEventListener("click", function () {
      taskList.removeChild(listItem);
      saveTasksToLocalStorage();
    });
  
    // Append elements to the task item
    listItem.appendChild(priorityLabel);
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(removeButton);
  
    // Add animation on adding/removing tasks
    listItem.style.transform = "scale(1.05)";
    setTimeout(() => {
      listItem.style.transform = "scale(1)";
    }, 100);
  
    // Append the task to the list
    taskList.appendChild(listItem);
  }
  
  // Save tasks to localStorage
  function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(function (task) {
      tasks.push({
        task: task.querySelector("span + text").textContent.trim(),
        priority: task.querySelector(".priority").textContent.trim(),
        completed: task.classList.contains("checked")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Load tasks from localStorage when the page is loaded
  window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(function (task) {
      createTaskItem(task.task, task.priority, task.completed);
    });
  };
  
  // Event listener for adding tasks
  addTaskButton.addEventListener("click", function () {
    let newTask = newTaskInput.value.trim();
    let priority = taskPrioritySelect.value;
  
    if (newTask !== "") {
      createTaskItem(newTask, priority);
      newTaskInput.value = "";
      saveTasksToLocalStorage();
    } else {
      alert("Please enter a task before adding.");
    }
  });
  
  // Event listener for "Mark All as Done"
  markAllButton.addEventListener("click", function () {
    document.querySelectorAll("#task-list li").forEach(function (task) {
      task.classList.add("checked");
      task.querySelector("span").classList.replace("fa-circle", "fa-check-circle");
    });
    saveTasksToLocalStorage();
  });
  
  // Dark Mode toggle
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    saveDarkModePreference();
  }
  
  // Save dark mode preference to localStorage
  function saveDarkModePreference() {
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  }
  
  // Load dark mode preference on page load
  window.onload = function () {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
      document.body.classList.add("dark-mode");
    }
  };
  