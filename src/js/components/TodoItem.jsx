function TodoItem({ todo, index, onDelete, onToggle }) {
  const label = typeof todo === "string" ? todo : todo.label;
  const done = todo && todo.done === true;

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          checked={!!done}
          onChange={(e) => onToggle(index, e.target.checked)}
          className="form-check-input me-2"
        />
        <span style={{ textDecoration: done ? "line-through" : "none" }}>{label}</span>
      </div>
      <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(index)}>❌</button>
    </li>
  );
}

export default TodoItem;