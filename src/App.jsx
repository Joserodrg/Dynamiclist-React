import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error obteniendo tareas:", error));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const item = { item: newTask };

    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, { id: data.id, name: newTask }]);
      })
      .catch((error) => console.error("Error agregando tarea:", error));
  };

  return (
    <>
      <h1>Dynamic List</h1>
      <div className="card">
        <input
          name="inputItem"
          placeholder="Ingresa una tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Item</button>
      </div>

      <h4>Pendientes:</h4>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
