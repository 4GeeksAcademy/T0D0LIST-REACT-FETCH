import { useEffect, useState } from "react";
import InputTodo from "./InputTodo.jsx";
import TodoList from "./TodoList.jsx";
import * as api from "../api";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addTodo = async (label) => {
    try {
      const updated = await api.createTodo(label);
      setTodos(Array.isArray(updated) ? updated : []);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeTodo = async (index) => {
    try {
      const updated = await api.deleteTodo(index);
      setTodos(Array.isArray(updated) ? updated : []);
    } catch (err) {
      setError(err.message);
      await load();
    }
  };

  const toggleTodo = async (index, done) => {
    try {
      const updated = await api.updateTodo(index, { done });
      setTodos(Array.isArray(updated) ? updated : []);
    } catch (err) {
      setError(err.message);
      await load();
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <InputTodo onAdd={addTodo} />

      {loading && <p>Cargando tareas...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && todos.length === 0 ? (
        <p className="text-muted">No hay tareas, añadir tareas</p>
      ) : (
        <TodoList todos={todos} onDelete={removeTodo} onToggle={toggleTodo} />
      )}
    </div>
  );
}

export default Home;