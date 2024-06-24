import axios from 'axios' 
import './style.css'

// Inicializa los listeners al cargar la página
function listenerLoad(){
  document.addEventListener('DOMContentLoaded', readUsers); // Carga los usuarios al cargar la página
  document.getElementById('user-form').addEventListener('submit', createUser); // Agrega listener para manejar el envío del formulario
}

// Función para leer usuarios del servidor y mostrarlos en la tabla
async function readUsers(){
  const data = await fetch('http://localhost:3000/users'); // Realiza una solicitud GET para obtener los usuarios
  const json = await data.json(); // Convierte la respuesta en un objeto JSON
  const tbody = document.querySelector('#table-users tbody'); // Selecciona el cuerpo de la tabla
  tbody.innerHTML = ''; // Limpia el contenido actual de la tabla

  // Recorre cada usuario y lo agrega a la tabla
  json.forEach((element, index) => {
    const fila = document.createElement('tr'); // Crea una nueva fila para la tabla

    // Celda número
    const celdaNro = document.createElement('th'); // Crea una celda para el número
    celdaNro.textContent = index + 1; // Asigna el número de la fila (índice + 1)
    fila.appendChild(celdaNro); // Agrega la celda a la fila

    // Celda nombre
    const celdaNombre = document.createElement('td'); // Crea una celda para el nombre
    celdaNombre.textContent = element.name; // Asigna el nombre del usuario
    fila.appendChild(celdaNombre); // Agrega la celda a la fila

    // Celda apellido
    const celdaApellido = document.createElement('td'); // Crea una celda para el apellido
    celdaApellido.textContent = element.lastname; // Asigna el apellido del usuario
    fila.appendChild(celdaApellido); // Agrega la celda a la fila

    // Celda país
    const celdaPais = document.createElement('td'); // Crea una celda para el país
    celdaPais.textContent = element.country; // Asigna el país del usuario
    fila.appendChild(celdaPais); // Agrega la celda a la fila

    // Celda acciones (para el botón eliminar)
    const celdaAcciones = document.createElement('td'); // Crea una celda para las acciones
    const btnEliminar = document.createElement('button'); // Crea un botón para eliminar
    btnEliminar.textContent = 'Eliminar'; // Asigna el texto del botón
    btnEliminar.addEventListener('click', () => deleteUser(element.id)); // Agrega un listener para el evento click del botón
    celdaAcciones.appendChild(btnEliminar); // Agrega el botón a la celda
    fila.appendChild(celdaAcciones); // Agrega la celda a la fila

    tbody.appendChild(fila); // Agrega la fila completa al cuerpo de la tabla
  });
}

// Función para crear un nuevo usuario
async function createUser(event){
  event.preventDefault(); // Evita el comportamiento predeterminado del formulario (recargar la página)
  
  const name = document.getElementById('name').value; // Obtiene el valor del campo nombre
  const lastname = document.getElementById('lastname').value; // Obtiene el valor del campo apellido
  const country = document.getElementById('country').value; // Obtiene el valor del campo país

  const newUser = {
    id: Date.now().toString(), // Genera un id único utilizando la fecha y hora actual
    name,
    lastname,
    country
  };

  await axios.post('http://localhost:3000/users', newUser); // Envia una solicitud POST para agregar el nuevo usuario

  // Limpiar formulario
  document.getElementById('user-form').reset(); // Resetea el formulario

  // Recargar la lista de usuarios
  readUsers(); // Vuelve a cargar la lista de usuarios para reflejar el nuevo usuario agregado
}

// Función para eliminar un usuario
async function deleteUser(id){
  await axios.delete(`http://localhost:3000/users/${id}`); // Envia una solicitud DELETE para eliminar el usuario con el id dado
  readUsers(); // Vuelve a cargar la lista de usuarios para reflejar el usuario eliminado
}

// Inicia los listeners
listenerLoad();
