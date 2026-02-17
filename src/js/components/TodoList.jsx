import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <ul className="list-group">
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
}

export default TodoList;