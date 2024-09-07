import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");

  //fetching todos
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((result) => {
        setTodos(result.data.slice(0, 10)); // Limiting to 10 items for simplicity
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  // Post todo
  const addTodo = () => {
    if (!newTodo) return; // Prevent adding empty todos
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: newTodo,
        completed: false,
      })
      .then((response) => {
        setTodos([response.data, ...todos]);
        setNewTodo("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  // update todo
  const updateTodo = (id, title, completed) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        title,
        completed: !completed,
      })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  // delete todo
  const deleteTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="App container my-5">
      <h1 className="text-center mb-4">Todo List</h1>
      {loading ? (
        <Loading />
      ) : (
        <TodoList
          todos={todos}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
