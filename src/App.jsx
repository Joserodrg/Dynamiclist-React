import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  // const [newTasks, setNewTasks] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error obteniendo tareas:", error));
  }, []);

  return (
    <>
      <h1>Dynamic List</h1>
      <div className="card">
        <label>
          <input
            name="inputItem"
            placeholder="Ingresa una tarea"
            //  value={newTasks}
          />
        </label>
        
        {/* <button onClick={newTasks}>Add Item</button> */}
      </div>

      <h4>Pendientes:</h4>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}>{task.name}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
