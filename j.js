function addTask() {
    var taskInput = document.getElementById("taskInput");
    var dueDate = document.getElementById("dueDate");
    var taskList = document.getElementById("taskList");

    if (taskInput.value === "" || dueDate.value === "") {
        alert("Please enter a task and due date.");
        return;
    }

    var li = document.createElement("li");
    li.textContent = taskInput.value + " - Due Date: " + dueDate.value;

    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.style.display = "none";
    li.appendChild(editInput);

    var doneButton = document.createElement("button");
    doneButton.textContent = "Done";
    doneButton.className = "done-Button";
    doneButton.onclick = function() {
        if (li.classList.contains("completed")) {
            li.classList.remove("completed");
        } else {
            li.classList.add("completed");
        }
        updateTaskCount();
        saveTasks();
    };
    li.appendChild(doneButton);

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-Button";
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        updateTaskCount();
        saveTasks();
    };
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";
    dueDate.value = "";
    updateTaskCount();
    saveTasks();
    }

    function clearTasks() {
        var taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        updateTaskCount();
    }

    function editTask(event) {
        var target = event.target;
        if (target.tagName === "LI") {
            var editInput = target.querySelector("input[type=text]");
            var taskName = target.firstChild;
            editInput.value = taskName.textContent.split(" - ")[0];
            editInput.style.display = "inline";
            taskName.style.display = "none";
            editInput.onblur = function() {
                taskName.textContent = editInput.value + " - Due Date: " + taskName.textContent.split(" - ")[1];
                editInput.style.display = "none";
                taskName.style.display = "inline";
            };
        }
    }

    function saveTasks() {
        var taskList = document.getElementById("taskList");
        var tasks = taskList.innerHTML;
        localStorage.setItem("tasks", tasks);
    }
    window.onload = function() {
        loadTasks();
    };

    function loadTasks() {
        var taskList = document.getElementById("taskList");
        taskList.innerHTML = localStorage.getItem("tasks");
        updateTaskCount();
        
        var doneButtons = document.querySelectorAll("#taskList li button:nth-child(2)");
        doneButtons.forEach(function(button) {
            button.onclick = function() {
                var li = button.parentElement;
                if (li.classList.contains("completed")) {
                    li.classList.remove("completed");
                } else {
                    li.classList.add("completed");
                }
                updateTaskCount();
                saveTasks();
            };
        });
    
        var deleteButtons = document.querySelectorAll("#taskList li button:nth-child(3)");
        deleteButtons.forEach(function(button) {
            button.onclick = function() {
                var li = button.parentElement;
                taskList.removeChild(li);
                updateTaskCount();
                saveTasks();
            };
        });

    }

    function filterTasks(status) {
        var taskList = document.getElementById("taskList");
        var tasks = taskList.children;

        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            if (status === "pending" && task.classList.contains("completed")) {
                task.style.display = "none";
            } else if (status === "completed" && !task.classList.contains("completed")) {
                task.style.display = "none";
            } else {
                task.style.display = "block";
            }
        }
    }

    function updateTaskCount() {
        var taskList = document.getElementById("taskList");
        var tasks = taskList.children;
        var totalTasks = tasks.length;
        var completedTasks = document.querySelectorAll(".completed").length;
        var pendingTasks = totalTasks - completedTasks;
        var taskCountElement = document.getElementById("taskCount");
        taskCountElement.textContent = "Total Tasks: " + totalTasks + ", Completed: " + completedTasks + ", Pending: " + pendingTasks;
    }

    // Animation function
    document.getElementById("addTaskBtn").addEventListener("click", function() {
        var addButton = document.getElementById("addTaskBtn");
        addButton.style.animation = "buttonAnimation 0.5s ease";
        addButton.addEventListener("animationend", function() {
            addButton.style.animation = "none";
        });
});
function toggleMenu() {
    var menu = document.querySelector('.slide-menu');
    menu.style.left = menu.style.left === '-250px' ? '0' : '-250px';
  }
  