import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// An array to store the todos
const todos: { id: number; text: string; done: boolean }[] = [];

// Handler for incoming requests
const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // CORS headers
  const headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow all origins
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  // GET /todos - List all todos
  if (req.method === "GET" && url.pathname === "/todos") {
    return new Response(JSON.stringify(todos), { headers, status: 200 });
  }

  // POST /todos - Add a new todo
  if (req.method === "POST" && url.pathname === "/todos") {
    try {
      const todo = await req.json();  // Parse JSON body
      todos.push({ id: todos.length + 1, text: todo.text, done: false });
      return new Response(JSON.stringify({ message: "Todo added" }), { headers, status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON format" }), { headers, status: 400 });
    }
  }

  // PUT /todos/:id - Update a todo (mark as done/undone)
  if (req.method === "PUT" && url.pathname.startsWith("/todos/")) {
    const id = parseInt(url.pathname.split("/")[2]);
    const updatedTodo = await req.json();  // Parse JSON body

    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.text = updatedTodo.text || todo.text;
      todo.done = updatedTodo.done;
      return new Response(JSON.stringify({ message: "Todo updated" }), { headers, status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Todo not found" }), { headers, status: 404 });
    }
  }

  // DELETE /todos/:id - Delete a todo
  if (req.method === "DELETE" && url.pathname.startsWith("/todos/")) {
    const id = parseInt(url.pathname.split("/")[2]);
    const index = todos.findIndex((t) => t.id === id);

    if (index !== -1) {
      todos.splice(index, 1);
      return new Response(JSON.stringify({ message: "Todo deleted" }), { headers, status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Todo not found" }), { headers, status: 404 });
    }
  }

  // If no route matches, return 404 Not Found
  return new Response(JSON.stringify({ error: "Not Found" }), { headers, status: 404 });
};

// Start the server
console.log("Listening on http://localhost:8000");
serve(handler);
