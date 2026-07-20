// Importamos useState y useEffect desde React.
// useState sirve para guardar información.
// useEffect sirve para ejecutar código automáticamente cuando la página carga.
import { useState, useEffect } from "react";

const Home = () => {

  // =====================================
  // ESTADOS
  // =====================================

  // Aquí guardamos TODAS las tareas que vienen del servidor.
  const [listaDeTareas, setListaDeTareas] = useState([]);

  // Aquí guardamos lo que el usuario escribe en el input.
  const [tarea, setTarea] = useState("");


  // =====================================
  // CARGAR TAREAS AL INICIAR (GET)
  // =====================================

  useEffect(() => {
    getTasks();
  }, []);

  // GET: Traer todas las tareas del usuario desde la API
  const getTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/graziele/todos")
      .then(res => res.json())
      .then(data => {
        // La API devuelve un objeto con la propiedad "todos"
        setListaDeTareas(data.todos);
      })
      .catch(err => console.log("Error al cargar tareas:", err));
  };


  // =====================================
  // FUNCIÓN PARA AÑADIR UNA TAREA (POST)
  // =====================================

  const agregarTarea = () => {

    if (tarea.trim() === "") return;

    const nuevaTarea = {
      label: tarea,
      is_done: false
    };

    fetch("https://playground.4geeks.com/todo/users/graziele/todos", {
      method: "POST",
      body: JSON.stringify(nuevaTarea),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => getTasks())
      .catch(err => console.log("Error al añadir tarea:", err));

    setTarea("");
  };


  // =====================================
  // FUNCIÓN PARA BORRAR UNA TAREA (DELETE)
  // =====================================

  const eliminarTarea = (id) => {

    fetch(`https://playground.4geeks.com/todo/users/graziele/todos/${id}`, {
      method: "DELETE"
    })
      .then(() => getTasks())
      .catch(err => console.log("Error al borrar tarea:", err));
  };


  // =====================================
  // FUNCIÓN PARA BORRAR TODAS LAS TAREAS (DELETE ALL)
  // =====================================

  const eliminarTodas = () => {

    fetch("https://playground.4geeks.com/todo/users/graziele/todos", {
      method: "DELETE"
    })
      .then(() => setListaDeTareas([]))
      .catch(err => console.log("Error al borrar todas las tareas:", err));
  };


  // =====================================
  // LO QUE VAMOS A VER EN LA PANTALLA
  // =====================================

  return (

    <div>

      <h1>Esta es mi lista de tareas</h1>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Escribe aquí la tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") agregarTarea();
        }}
      />

      {/* BOTÓN PARA AÑADIR */}
      <button onClick={agregarTarea}>
        Añadir
      </button>

      {/* BOTÓN PARA BORRAR TODAS */}
      <button
        onClick={eliminarTodas}
        style={{ marginLeft: "10px", background: "red", color: "white" }}
      >
        Borrar todas
      </button>

      {/* LISTA DE TAREAS */}
      <ul>
        {
          listaDeTareas.map((item) => (
            <li key={item.id}>

              {item.label}

              {/* Botón para borrar la tarea */}
              <button onClick={() => eliminarTarea(item.id)}>
                ❌
              </button>

            </li>
          ))
        }
      </ul>

      <p>
        Tareas pendientes: {listaDeTareas.length}
      </p>

    </div>

  );

};

export default Home;
