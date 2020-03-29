const taskForm = document.querySelector('#form');
const taskInput = document.querySelector('#task-field');
const filterTask = document.querySelector('.filter-task-input');
const taskList = document.querySelector('.task-collection');
const clearBtn = document.querySelector('.clear-btn');

loadAllEventListener();
// loading all event listener
function loadAllEventListener() {
  // Dom load Event
  document.addEventListener('DOMContentLoaded', getAllTasks);

  //Adding task
  taskForm.addEventListener('submit', addTask);
  //Removing task
  taskList.addEventListener('click', removeTask);
  //Clearing all the task fields
  clearBtn.addEventListener('click', clearTask);
  // filtering through the tasks
  filterTask.addEventListener('keyup', taskFilter);
}
// Get All the task form local storage
function getAllTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(task => {
    // Creating li element dynamically
    const li = document.createElement('li');
    // Adding class name
    li.className = 'collection-item';
    // Creating text node into the li element
    li.appendChild(document.createTextNode(task));
    // creating link element
    const link = document.createElement('a');
    // adding class name
    link.className = 'delete-item';
    // creating innerHtml
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Apppend link to the li
    li.appendChild(link);

    // Append li to it's parent element ul
    taskList.appendChild(li);
  });
}
//adding Task function

function addTask(e) {
  if (taskInput.value === '') {
    alert('Task Field is Empty!');
  }
  // Creating li element dynamically
  const li = document.createElement('li');
  // Adding class name
  li.className = 'collection-item';
  // Creating text node into the li element
  li.appendChild(document.createTextNode(taskInput.value));
  // creating link element
  const link = document.createElement('a');
  // adding class name
  link.className = 'delete-item';
  // creating innerHtml
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Apppend link to the li
  li.appendChild(link);

  // Append li to it's parent element ul
  taskList.appendChild(li);

  // Store task in Local storage
  storeTaskInLocalStorage(taskInput.value);
  // clearing input fields
  taskInput.value = '';

  e.preventDefault();
}
// store TAsk
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remoing task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Do you want to delete it?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  // Remove from Local Storage
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
// Remvoing Task form local Storage
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clearing all the task at once
function clearTask() {
  if (confirm('Want to clear all task?')) {
    taskList.innerHTML = '';
  }
  clearAllTaskFromLocalStorage();
}
function clearAllTaskFromLocalStorage() {
  localStorage.clear();
}
// Filtering thourgh the task list
function taskFilter(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
