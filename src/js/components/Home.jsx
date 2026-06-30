// Importamos useState desde React.
// useState sirve para guardar información.
// Cuando esa información cambia, React vuelve a dibujar la pantalla.
import { useState } from "react";

const Home = () => {

  // =====================================
  // ESTADOS
  // =====================================

  // Aquí guardamos TODAS las tareas.
  // Empieza siendo un array vacío porque todavía no hay ninguna tarea.
  const [listaDeTareas, setListaDeTareas] = useState([]);

  // Aquí guardamos lo que el usuario está escribiendo en el input.
  // Empieza siendo un texto vacío ("").
  const [tarea, setTarea] = useState("");



  // =====================================
  // FUNCIÓN PARA AÑADIR UNA TAREA
  // =====================================

  const agregarTarea = () => {

    // Si el usuario no ha escrito nada
    // (o solo ha escrito espacios),
    // no hacemos nada y salimos de la función.
    if (tarea.trim() === "") return;

    // Creamos un NUEVO array.
    //
    // Los tres puntos (...) copian todas las tareas
    // que ya existen dentro del array.
    //
    // Después añadimos la nueva tarea al final.
    //
    // Ejemplo:
    //
    // listaDeTareas = ["Comprar pan", "Estudiar"]
    //
    // [...listaDeTareas, tarea]
    //
    // Resultado:
    //
    // ["Comprar pan", "Estudiar", "Ir al gimnasio"]
    setListaDeTareas([
      ...listaDeTareas,
      tarea
    ]);

    // Ahora que la tarea ya está guardada,
    // vaciamos el input para poder escribir otra.
    setTarea("");
  };



  // =====================================
  // FUNCIÓN PARA BORRAR UNA TAREA
  // =====================================

  const eliminarTarea = (indice) => {

    // filter() recorre TODO el array.
    //
    // Va mirando una tarea por una.
    //
    // Si devuelve TRUE -> la tarea se queda.
    //
    // Si devuelve FALSE -> la tarea desaparece.
    //
    // "_" significa:
    // "Esta variable existe pero no la voy a utilizar".
    //
    // index es la posición de la tarea.
    //
    // index !== indice significa:
    //
    // "Quédate con todas las tareas
    // menos con la que quiero borrar."

    const nuevaLista = listaDeTareas.filter((_, index) => {

      return index !== indice;

    });

    // Guardamos la nueva lista
    // (que ya no tiene la tarea borrada).
    setListaDeTareas(nuevaLista);

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

        // Tipo de input
        type="text"

        // Texto gris que aparece cuando está vacío
        placeholder="Escribe aquí la tarea"

        // Lo que aparece escrito dentro del input
        // siempre será lo que haya en la variable "tarea".
        value={tarea}

        // Cada vez que el usuario escribe una letra,
        // guardamos ese nuevo texto.
        //
        // e significa "evento".
        //
        // e.target es el input.
        //
        // e.target.value es el texto que hay escrito.
        onChange={(e) => {

          setTarea(e.target.value);

        }}

        // Cuando el usuario pulsa una tecla,
        // comprobamos cuál ha sido.
        onKeyDown={(e) => {

          // Si la tecla es Enter...
          if (e.key === "Enter") {

            // ...añadimos la tarea.
            agregarTarea();

          }

        }}

      />



      {/* BOTÓN */}

      <button onClick={agregarTarea}>

        Añadir

      </button>



      {/* LISTA DE TAREAS */}

      <ul>

        {

          // map() recorre TODO el array.
          //
          // Va pasando por cada tarea una por una.
          //
          // Si el array tiene:
          //
          // ["Comprar pan", "Estudiar", "Dormir"]
          //
          // map hace esto:
          //
          // 1ª vuelta
          // tarea = "Comprar pan"
          //
          // 2ª vuelta
          // tarea = "Estudiar"
          //
          // 3ª vuelta
          // tarea = "Dormir"
          //
          // En cada vuelta devuelve un <li>.

          listaDeTareas.map((tarea, index) => (

            <li key={index}>

              {/* Mostramos el texto de la tarea */}
              {tarea}

              {/* Botón para borrar la tarea */}
              <button onClick={() => eliminarTarea(index)}>

                ❌

              </button>

            </li>

          ))

        }

      </ul>



      {/* MOSTRAR CUÁNTAS TAREAS HAY */}

      <p>

        {/* length cuenta cuántos elementos tiene el array */}
        Tareas pendientes: {listaDeTareas.length}

      </p>

    </div>

  );

};

// Exportamos el componente para poder utilizarlo
// en otros archivos del proyecto.
export default Home;