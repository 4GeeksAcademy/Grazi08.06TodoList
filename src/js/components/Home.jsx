// Importamos useState y useEffect desde React.
// useState sirve para guardar información.
// useEffect sirve para ejecutar código automáticamente cuando la página carga.
import { useState, useEffect } from "react";

const Home = () => {

  // =====================================
  // ESTADOS
  // =====================================

  // Aquí guardamos TODAS las tareas que vienen del servidor.
  // Empieza siendo un array vacío porque todavía no hemos hecho el GET.
  const [listaDeTareas, setListaDeTareas] = useState([]);

  // Aquí guardamos lo que el usuario escribe en el input.
  const [tarea, setTarea] = useState("");


  // =====================================
  // CARGAR TAREAS AL INICIAR (GET)
  // =====================================

  // useEffect se ejecuta automáticamente cuando la página carga.
  // Aquí llamamos a getTasks() para traer las tareas del servidor.
  useEffect(() => {
    getTasks();
  }, []);

  // Esta función hace un GET a la API para obtener todas las tareas del usuario.
  // IMPORTANTE: esta es la ruta correcta de la API.
  const getTasks = () => {
    fetch("https://playground.4geeks.com/todo/users/graziele/todos")
      .then(res => res.json())
      .then(data => {
        // data es un array con todas las tareas del servidor.
        setListaDeTareas(data);
      })
      .catch(err => console.log("Error al cargar tareas:", err));
  };


  // =====================================
  // FUNCIÓN PARA AÑADIR UNA TAREA (POST)
  // =====================================

  const agregarTarea = () => {

    // Si el usuario no ha escrito nada, no hacemos nada.
    if (tarea.trim() === "") return;

    // Creamos el objeto EXACTO que la API necesita.
    const nuevaTarea = {
      label: tarea,
      is_done: false
    };

    // Hacemos un POST para añadir la tarea al servidor.
    // IMPORTANTE: esta es la ruta correcta de la API.
    fetch("https://playground.4geeks.com/todo/users/graziele/todos", {
      method: "POST",
      body: JSON.stringify(nuevaTarea),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        // Después de añadir la tarea, volvemos a hacer GET para refrescar la lista.
        getTasks();
      })
      .catch(err => console.log("Error al añadir tarea:", err));

    // Limpiamos el input.
    setTarea("");
  };


  // =====================================
  // FUNCIÓN PARA BORRAR UNA TAREA (DELETE)
  // =====================================

  const eliminarTarea = (id) => {

    // DELETE necesita la URL con el ID de la tarea.
    // IMPORTANTE: esta es la ruta correcta de la API.
    fetch(`https://playground.4geeks.com/todo/users/graziele/todos/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        // Después de borrar, refrescamos la lista con GET.
        getTasks();
      })
      .catch(err => console.log("Error al borrar tarea:", err));
  };


  // =====================================
  // FUNCIÓN PARA BORRAR TODAS LAS TAREAS (DELETE ALL)
  // =====================================

  const eliminarTodas = () => {

    // Esta ruta borra TODAS las tareas del usuario.
    fetch("https://playground.4geeks.com/todo/users/graziele/todos", {
      method: "DELETE"
    })
      .then(() => {
        // Dejamos la lista vacía en el frontend.
        setListaDeTareas([]);
      })
      .catch(err => console.log("Error al borrar todas las tareas:", err));
  };


  // =====================================
  // LO QUE VAMOS A VER EN LA PANTALLA
  // =====================================

  return (

    <div>

      {/* Título */}
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
      <button onClick={eliminarTodas} style={{ marginLeft: "10px", background: "red", color: "white" }}>
        Borrar todas
      </button>

      {/* LISTA DE TAREAS */}
      <ul>
        {
          listaDeTareas.map((item) => (
            <li key={item.id}>

              {/* Mostramos el texto de la tarea */}
              {item.label}

              {/* Botón para borrar la tarea */}
              <button onClick={() => eliminarTarea(item.id)}>
              </button>

            </li>
          ))
        }
      </ul>

      {/* MOSTRAR CUÁNTAS TAREAS HAY */}
      <p>
        Tareas pendientes: {listaDeTareas.length}
      </p>

    </div>

  );

};

export default Home;
