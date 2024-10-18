# deno2-todo-app

A simple Todo application built with Deno. This app allows users to create, read, update, and delete todos.

## Features

- Add new todos
- Mark todos as done or undone
- Delete todos
- Responsive design

## Technologies Used

- Deno
- HTML
- CSS
- JavaScript

## Getting Started

### Prerequisites

Make sure you have Deno installed on your machine. You can download it from [deno.land](https://deno.land/).

### Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/deno2-todo-app.git
   cd deno2-todo-app
   ```

2. Start the server:
   ```bash
   deno run --watch server.ts
   ```

3. In a separate terminal, start the static file server:
   ```bash
   deno run --watch static_server.ts
   ```

4. Open your browser and navigate to `http://localhost:8080` to view the app.

## API Endpoints

- `GET /todos` - Retrieve all todos
- `POST /todos` - Add a new todo
- `PUT /todos/:id` - Update a todo (mark as done/undone)
- `DELETE /todos/:id` - Delete a todo

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
