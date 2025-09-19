// Select elements
const taskInput = document.getElementById("taskInput");
const newTaskBtn = document.getElementById("newTask");
const taskList = document.getElementById("task-list");
const progressBar = document.getElementById("progress");
const numbers = document.getElementById("numbers");

// Store tasks
let tasks = [];
let editIndex = -1; // -1 means "not editing"

// Add / Save task
newTaskBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent form refresh
  const taskText = taskInput.value.trim();

  if (taskText === "") return; // ignore empty input

  if (editIndex === -1) {
    // Normal add
    const task = { text: taskText, completed: false };
    tasks.push(task);
  } else {
    // Save edited task
    tasks[editIndex].text = taskText;
    editIndex = -1;
    newTaskBtn.textContent = "+"; // reset button
  }

  taskInput.value = ""; // clear input
  updateTaskList();
});

// Update task list
function updateTaskList() {
  taskList.innerHTML = ""; // clear old list

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem ${task.completed ? "completed" : ""}">
        <div class="task">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./images/edit.png" alt="Edit" class="edit-btn"/>
          <img src="./images/bin.jpg" alt="Delete" class="delete-btn"/>
        </div>
      </div>
    `;

    // Checkbox toggle
    listItem.querySelector(".checkbox").addEventListener("change", () => {
      tasks[index].completed = !tasks[index].completed;
      updateTaskList();
    });

    // Delete task
    listItem.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      updateTaskList();
    });

    // Edit task
    listItem.querySelector(".edit-btn").addEventListener("click", () => {
      taskInput.value = tasks[index].text; // put text into input
      editIndex = index; // remember which task we are editing
      newTaskBtn.textContent = "✔"; // change button symbol
    });

    taskList.appendChild(listItem);
  });

  updateStats();
}

// Update stats and progress bar
function updateStats() {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  numbers.textContent = `${completedTasks}/${totalTasks}`;

  if (totalTasks === 0) {
    progressBar.style.width = "0%";
  } else {
    const progress = (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progress}%`;
  }
}
