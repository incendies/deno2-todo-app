const apiUrl = "http://localhost:8000/todos";

// Function to fetch all todos from the server
async function fetchTodos() {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    renderTodos(todos);
}

// Function to render the todos in the list
function renderTodos(todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; // Clear the list first
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = todo.done ? 'done' : '';
        todoItem.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button onclick="_markDone(${todo.id}, ${todo.done})">Done</button>
                <button onclick="_deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

// Function to add a new todo
async function addTodo() {
    const newTodoText = document.getElementById('new-todo').value;
    if (newTodoText.trim()) {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: newTodoText })
        });
        document.getElementById('new-todo').value = ''; // Clear the input
        fetchTodos(); // Refresh the list
    }
}

// Function to mark a todo as done or undone
async function _markDone(id, done) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: !done })
    });
    fetchTodos(); // Refresh the list
}

// Function to delete a todo
async function _deleteTodo(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchTodos(); // Refresh the list
}

// Event listener for adding a new todo
document.getElementById('add-todo').addEventListener('click', addTodo);

// Initial fetch to load todos
fetchTodos();
