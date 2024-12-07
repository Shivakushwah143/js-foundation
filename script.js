
// // Select DOM elements
// const taskInput = document.getElementById('taskInput'); // Input field for entering tasks
// const addTaskBtn = document.getElementById('addTaskBtn'); // Button to add a task
// const clearTasksBtn = document.getElementById('clearTasksBtn'); // Button to clear all tasks
// const taskList = document.getElementById('taskList'); // Unordered list to display tasks

// // Initialize tasks array
// let tasks = []; // Array to store all tasks

// // Add a task when the "Add Task" button is clicked
// addTaskBtn.addEventListener('click', () => {
//   // Trim the input value to avoid empty or whitespace-only tasks
//   const task = taskInput.value.trim();

//   // Check if a task was entered
//   if (task) {
//     // Create a new task object
//     const newTask = {
//       id: tasks.length + 1, // Unique ID for the task
//       name: task, // Task name
//       date: new Date(), // Timestamp of when the task was created
//     };

//     // Add the new task to the tasks array
//     tasks.push(newTask);

//     // Clear the input field after adding the task
//     taskInput.value = '';

//     // Update the displayed list of tasks
//     displayTasks();

//     // Log the updated tasks array for debugging
//     console.log(tasks); // This will show the updated tasks in the console
//   } else {
//     alert("Please enter a task before adding!"); // Show alert if the input is empty
//   }
// });

// // Clear all tasks when the "Clear Tasks" button is clicked
// clearTasksBtn.addEventListener('click', () => {
//   tasks = []; // Reset the tasks array to an empty array
//   displayTasks(); // Update the displayed list of tasks (now empty)

//   // Log the updated tasks array for debugging
//   console.log(tasks); // This will show the empty tasks array
// });

// // Display the list of tasks in the HTML
// function displayTasks() {
//   taskList.innerHTML = ''; // Clear the current list of tasks

//   // Loop through each task and add it to the list
//   tasks.forEach(task => {
//     const taskItem = document.createElement('li'); // Create a list item element
//     taskItem.textContent = `${task.name} - ${task.date.toLocaleDateString()}`; // Display task name and formatted date
//     taskItem.className = "text-gray-700"; // Add Tailwind CSS class for styling
//     taskList.appendChild(taskItem); // Append the task to the list
//   });

//   // Log the tasks array after display for debugging
//   console.log(tasks); // This will show the tasks in the console
// }

// // Filter tasks by keyword
// function filterTasks(keyword) {
//   return tasks.filter(task =>
//     task.name.toLowerCase().includes(keyword.toLowerCase()) // Match tasks containing the keyword (case-insensitive)
//   );
// }

// // Example usage: Log filtered tasks containing the word "task"
// console.log(filterTasks("task"));

// // Sort tasks by date (newest first)
// function sortTasksByDate() {
//   tasks.sort((a, b) => b.date - a.date); // Sort tasks by date in descending order
//   displayTasks(); // Update the displayed list of tasks

//   // Log sorted tasks for debugging
//   console.log("Sorted tasks by date:", tasks); // This will show sorted tasks in the console
// }

// // Add a "Sort by Date" button
// const sortBtn = document.createElement('button'); // Create a new button element
// sortBtn.textContent = "Sort by Date"; // Set the button text
// sortBtn.className = "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 my-4"; // Add Tailwind CSS classes for styling
// sortBtn.addEventListener('click', sortTasksByDate); // Add event listener to sort tasks
// document.body.appendChild(sortBtn); // Append the button to the body

// // Using array methods for additional functionality
// // 1. Display all task names using map
// console.log("Task names:", tasks.map(task => task.name));

// // 2. Count total tasks using reduce
// console.log("Total tasks:", tasks.reduce((count, task) => count + 1, 0));

// // 3. Find a task with a specific name using find
// console.log("Find task named 'Some Task':", tasks.find(task => task.name === "Some Task"));

// // 4. Log all tasks to the console using forEach
// console.log("All tasks:");
// tasks.forEach(task => console.log(task));

// // Display timestamps for each task using getTime
// tasks.forEach(task => {
//   console.log(`Task: ${task.name}, Timestamp: ${task.date.getTime()}`);
// });



// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const clearTasksBtn = document.getElementById('clearTasksBtn');
const taskList = document.getElementById('taskList');
const filterInput = document.getElementById('filterInput');

// Initialize tasks array
let tasks = [];

// Add a task when the "Add Task" button is clicked
addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();

  if (task) {
    const newTask = {
      id: tasks.length + 1,
      name: task,
      date: new Date(), // Add timestamp
      isCompleted: false,
    };

    tasks.push(newTask);
    taskInput.value = '';
    displayTasks();
  } else {
    alert("Please enter a task!");
  }
});

// Display tasks in the list
function displayTasks() {
  taskList.innerHTML = ''; // Clear the current task list

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = "flex justify-between items-center bg-white p-2 rounded shadow-sm";
    taskItem.innerHTML = `
      <span class="${task.isCompleted ? 'line-through text-gray-500' : ''}">${task.name} (${task.date.toLocaleDateString()})</span>
      <button onclick="toggleComplete(${task.id})" class="bg-green-500 text-white px-2 py-1 rounded">Complete</button>
      <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Toggle task completion
function toggleComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.isCompleted = !task.isCompleted;
    displayTasks();
  }
}

// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  displayTasks();
}

// Clear all tasks
clearTasksBtn.addEventListener('click', () => {
  tasks = [];
  displayTasks();
});

// Filter tasks based on the search input
filterInput.addEventListener('input', (e) => {
  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(e.target.value.toLowerCase()));
  taskList.innerHTML = '';
  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = "flex justify-between items-center bg-white p-2 rounded shadow-sm";
    taskItem.innerHTML = `
      <span class="${task.isCompleted ? 'line-through text-gray-500' : ''}">${task.name} (${task.date.toLocaleDateString()})</span>
      <button onclick="toggleComplete(${task.id})" class="bg-green-500 text-white px-2 py-1 rounded">Complete</button>
      <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
});

// Example of using array methods
console.log("All Tasks:", tasks); // Array of all tasks
console.log("Completed Tasks:", tasks.filter(task => task.isCompleted)); // Filter completed tasks
console.log("Total Tasks:", tasks.length); // Use reduce or simple length

// JSON Methods Example
const tasksJSON = JSON.stringify(tasks); // Convert tasks array to JSON
console.log("Tasks in JSON:", tasksJSON);

// Parse JSON back to array
const parsedTasks = JSON.parse(tasksJSON);
console.log("Parsed Tasks:", parsedTasks);
