let editIndex = -1; // Variable to keep track of the index of the item being edited

// Helper function to read data from localStorage and render the todo list
function renderData() {
  const todoListContainer = document.getElementById("todo-list");
  todoListContainer.innerHTML = ""; // Clear current list
  const todos = JSON.parse(localStorage.getItem("todos")) || []; // Get todos or empty array
  
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
      <span class="${todo.done ? 'completed' : ''}" data-id="${index}" onclick="toggleDone(${index})">${todo.text}</span>
      <div>
        <button onclick="editItem(${index})" ${todo.done ? 'disabled' : ''}>Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </div>
    `;
    todoListContainer.appendChild(todoItem);
  });
}

// Add or Edit an item in the list
function addItem() {
  const input = document.getElementById("todo-input");
  const todoText = input.value.trim();

  if (todoText !== "") {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    
    if (editIndex === -1) {
      // Add a new todo
      todos.push({ text: todoText, done: false });
    } else {
      // Edit an existing todo
      todos[editIndex].text = todoText;
      editIndex = -1; // Reset edit index after saving
    }
    
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = ""; // Clear input field
    renderData(); // Re-render the list
    updateButtonState(); // Reset button to "Add"
  }
}

// Edit an item in the list
function editItem(index) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = todos[index].text;

  // Set the input field with the current todo text
  document.getElementById("todo-input").value = todoText;

  // Set the editIndex to mark that this item is being edited
  editIndex = index;

  // Change the button text to "Update"
  updateButtonState();
}

// Delete an item from the list
function deleteItem(index) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderData(); // Re-render the list after deleting
}

// Mark an item as done/undone
function toggleDone(index) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos[index].done = !todos[index].done;
  localStorage.setItem("todos", JSON.stringify(todos));
  renderData(); // Re-render the list after updating the done status
}

// Update the state of the "Add" button
function updateButtonState() {
  const addButton = document.getElementById("add-btn");
  
  if (editIndex === -1) {
    // If not editing, show "Add" button
    addButton.textContent = "Add";
  } else {
    // If editing, show "Update" button
    addButton.textContent = "Update";
  }
}

// Initialize the app
document.getElementById("add-btn").addEventListener("click", addItem);
window.onload = function() {
  renderData();
  updateButtonState(); // Set initial button state
};

/******** codepen *******/ 
// js is for the animation loop for the strokes
const textElement = document.getElementById("animatedText");

function restartAnimation() {
  textElement.style.transition = "none";
  textElement.style.strokeDashoffset = "0";

  setTimeout(() => {
    textElement.style.transition = "stroke-dashoffset 3s ease";
    textElement.style.strokeDashoffset = "1000";
  }, 50);
}

// Start de animatie direct en in een loop
restartAnimation();
setInterval(restartAnimation, 10000);
