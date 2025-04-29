let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      filter === "completed" && !task.completed ||
      filter === "pending" && task.completed
    ) return;

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})">
      <span>${task.text}</span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    list.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
