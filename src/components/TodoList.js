import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const TodoList = ({
  todos,
  newTodo,
  setNewTodo,
  addTodo,
  updateTodo,
  deleteTodo,
}) => {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const startEditing = (todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  };

  const saveEdit = (id, completed) => {
    updateTodo(id, editingTitle, completed);
    setEditingTodoId(null);
  };

  return (
    <>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              todo.completed ? "list-group-item-success" : ""
            }`}
          >
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  className="form-control me-3"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => saveEdit(todo.id, todo.completed)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <div>
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={todo.completed}
                    onChange={() =>
                      updateTodo(todo.id, todo.title, todo.completed)
                    }
                  />
                  <span
                    className={`todo-title ${
                      todo.completed ? "text-decoration-line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <div>
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => startEditing(todo)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
