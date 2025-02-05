import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

 const fetchItems = () => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error obteniendo tareas:", error));
  }

  useEffect(() => {
    fetchItems();
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

  const removeData = (id) => {
    fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })

      .then(() => {
        fetchItems();
      })
      .catch((err) => {
        console.error("Delete Fetch error", err);
      });
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

      <table>
        <tbody>
          {tasks.map(({ id, name }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td className="PendingTasks">
                <button className="button" onClick={() => removeData(id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
