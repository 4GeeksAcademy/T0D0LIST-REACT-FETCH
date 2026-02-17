import { useState } from "react";

function InputTodo({ onAdd }) {
  const [input, setInput] = useState("");

  const addTodo = async () => {
    if (input.trim() === "") return;
    await onAdd(input.trim());
    setInput("");
  };

  return (
    <div className="mb-3 d-flex">
      <input
        className="form-control"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTodo();
          }
        }}
        placeholder="Escribe una tarea..."
      />
      <button className="btn btn-primary ms-2" onClick={addTodo}>➕</button>
    </div>
  );
}

export default InputTodo;