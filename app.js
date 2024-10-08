// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromStorage);

// Event listener for adding a new task
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        ${taskText}
        <button class="delete-btn">Delete</button>
    `;

    // Add task to list
    taskList.appendChild(taskItem);

    // Save task to localStorage
    saveTaskToStorage(taskText);

    // Clear the input field
    taskInput.value = '';

    // Add delete functionality to the new task
    taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);

    // Mark task as completed on click
    taskItem.addEventListener('click', toggleComplete);
}

// Function to delete a task
function deleteTask(e) {
    const taskItem = e.target.parentElement;
    const taskText = taskItem.textContent.replace('Delete', '').trim();

    // Remove task from the DOM
    taskItem.remove();

    // Remove task from localStorage
    removeTaskFromStorage(taskText);

    e.stopPropagation();  // Prevent event bubbling
}

// Function to mark/unmark task as complete
function toggleComplete(e) {
    if (e.target.tagName === 'BUTTON') return; // Ignore clicks on the delete button
    e.target.classList.toggle('completed');
}

// Save a task to localStorage
function saveTaskToStorage(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove a task from localStorage
function removeTaskFromStorage(task) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasksFromStorage() {
    let tasks = getTasksFromStorage();

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${task}
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(taskItem);

        // Add delete functionality
        taskItem.querySelector('.delete-btn').addEventListener('click', deleteTask);

        // Mark task as completed on click
        taskItem.addEventListener('click', toggleComplete);
    });
}

// Get tasks from localStorage
function getTasksFromStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}
