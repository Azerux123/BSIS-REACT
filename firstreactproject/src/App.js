import React, { useState, useEffect } from "react";
import "./App.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() !== "") {
      if (editMode) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editId ? { ...todo, task } : todo
        );
        setTodos(updatedTodos);
        setEditMode(false);
        setEditId(null);
      } else {
        setTodos([...todos, { id: Date.now(), task }]);
      }
      setTask("");
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTask(todoToEdit.task);
    setEditMode(true);
    setEditId(id);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setEditMode(false);
    setEditId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="Task">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter task"
        />
        <button onClick={addTodo}>
          {editMode ? "Update Task" : "Add Task"}
        </button>
      </div>
      <div className="list-container">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.task}
              <button className="edit" onClick={() => editTodo(todo.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
