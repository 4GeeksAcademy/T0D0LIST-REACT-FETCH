const BASE = "https://playground.4geeks.com/todo/users/AdrianSS";
const LOCAL_KEY = "todos_AdrianSS";

function isBrowser() {
  return typeof window !== "undefined" && !!window.localStorage;
}

function readLocal() {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocal(list) {
  if (!isBrowser()) return list;
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch (e) {

  }
  return list;
}

async function parseJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    return text;
  }
}

export async function getTodos() {
  try {
    const res = await fetch(BASE);
    if (res.ok) return parseJson(res);
    // fallback to local if server returns error
    return readLocal();
  } catch (e) {
    return readLocal();
  }
}

async function putTodos(list) {
  const opts = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(list),
  };

  try {
    let res = await fetch(BASE, opts);
    if (res.ok) return parseJson(res);

    if (res.status === 405) {
      const res2 = await fetch(BASE, { ...opts, method: "POST" });
      if (res2.ok) return parseJson(res2);
      // fallback to local storage when POST also fails
      return saveLocal(list);
    }

    return saveLocal(list);
  } catch (e) {
    return saveLocal(list);
  }
}

export async function createTodo(label) {
  const current = await getTodos();
  const list = Array.isArray(current) ? current.slice() : [];
  list.push({ label, done: false });
  return putTodos(list);
}

export async function updateTodo(index, updates) {
  const current = await getTodos();
  const list = Array.isArray(current) ? current.slice() : [];
  if (index < 0 || index >= list.length) throw new Error("index out of range");
  list[index] = { ...list[index], ...updates };
  return putTodos(list);
}

export async function deleteTodo(index) {
  const current = await getTodos();
  const list = Array.isArray(current) ? current.slice() : [];
  if (index < 0 || index >= list.length) throw new Error("index out of range");
  list.splice(index, 1);
  return putTodos(list);
}

export default { getTodos, createTodo, updateTodo, deleteTodo };
