// Importación de clases específicas para cada tipo de animal desde el módulo 'especies.js'
import { Leon, Lobo, Oso, Serpiente, Aguila } from './clases/especies.js';
// Importación de la función 'animalData', esta función se utiliza para acceder a los datos de cada animal, como su imagen y sonido
import { animalData } from './data.js';

// Selección de elementos del DOM
const animalSelect = document.getElementById("animal"); // Select para elegir el nombre del animal
const vistaPrevia = document.getElementById("preview"); // Elemento para mostrar la imagen de vista previa
const edadSelect = document.getElementById("edad"); // Select para elegir la edad del animal
const comentarioTextarea = document.getElementById("comentarios"); // Textarea para los comentarios
const contenedorAnimales = document.getElementById("Animales"); // Contenedor para las tarjetas de animales
const contenedorModal = document.getElementById("modalAnimales"); // Contenedor para los modales de información de animales
let animalesInvestigados = []; // Array para almacenar las instancias de animales creados

// Evento para actualizar la imagen de vista previa al cambiar la selección del animal
animalSelect.addEventListener("change", async (event) => {
    const animalOption = event.target.value;
    const rutaImagen = (await animalData(animalOption)).imagen;

    // Actualiza el fondo del contenedor de vista previa con la imagen correspondiente al animal seleccionado
    vistaPrevia.style.backgroundImage = `url('assets/imgs/${rutaImagen}')`;
});

// Función para crear una instancia del animal, y generar la tarjeta y el modal correspondiente en el DOM
const crearAnimal = async (animal) => {
    const nombre = animalSelect.value;
    const edad = edadSelect.value;
    const comentarios = comentarioTextarea.value;
    const imagen = (await animalData(animal)).imagen;
    const sonido = (await animalData(animal)).sonido;
    let nuevoAnimal;

    // Crear una instancia del animal según el tipo seleccionado
    switch (animal) {
        case 'Leon':
            nuevoAnimal = new Leon(nombre, edad, imagen, comentarios, sonido);
            break;
        case 'Lobo':
            nuevoAnimal = new Lobo(nombre, edad, imagen, comentarios, sonido);
            break;
        case 'Oso':
            nuevoAnimal = new Oso(nombre, edad, imagen, comentarios, sonido);
            break;
        case 'Serpiente':
            nuevoAnimal = new Serpiente(nombre, edad, imagen, comentarios, sonido);
            break;
        case 'Aguila':
            nuevoAnimal = new Aguila(nombre, edad, imagen, comentarios, sonido);
            break;
    }

    // Agregar el nuevo animal al array de animales investigados
    animalesInvestigados.push(nuevoAnimal);

    // Crear la tarjeta del animal y agregarla al contenedor de animales en el DOM
    const index = animalesInvestigados.length - 1;
    const cardAnimal = formatoCard(nuevoAnimal, index);
    contenedorAnimales.insertAdjacentHTML('beforeend', cardAnimal);

    // Crear el modal con la información del animal y agregarlo al contenedor de modales en el DOM
    const modalAnimal = formatoModal(nuevoAnimal, index);
    contenedorModal.insertAdjacentHTML('beforeend', modalAnimal);

    // Vincular el evento para reproducir el sonido del animal
    reproducirSonido();
}

// Función para generar el HTML de la tarjeta de un animal
const formatoCard = (animal, index) => `
    <div id="${animal.nombre}${index}" class="card text-white bg-secondary m-2 ">
        <div class="position-relative rounded">
            <img src="assets/imgs/${animal.img}" class="card-img-top participante object-fit-cover" alt="${animal.nombre}" >
            <div class="w-100 h-100 position-absolute top-0 start-0 rounded">
                <a class="btn btn-warning text-white w-100 h-100 opacity-0 bg-h d-flex flex-column align-items-center justify-content-center"
                   data-bs-toggle="modal" data-bs-target="#animal${animal.nombre}${index}">
                    <i class="fa-regular fa-eye fa-2x"></i>
                    <p>Más información...</p>
                </a>
            </div>
        </div>
        <button class="boton-sonido btn btn-secondary p-1" data-sonido="assets/sounds/${animal.sonido}">
            <img src="assets/imgs/audio.svg" class="p-1" height="30rem" alt="Reproducir sonido de ${animal.nombre}">
        </button>
    </div>`;

// Función para generar el HTML del modal con la información del animal
const formatoModal = (animal, index) => `
    <div class="modal fade" id="animal${animal.nombre}${index}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered w-25" role="document">
            <div class="modal-content bg-dark text-white">
                <div class="modal-body text-center">
                    <img src="assets/imgs/${animal.img}" class="w-100 rounded" alt="${animal.nombre}">
                    <h5 class="mt-3">${animal.nombre}</h5>
                    <hr>
                    <h5 class="mt-3">Rango de edad:</h5>
                    <p>${animal.edad}</p>
                    <hr>
                    <h5>Comentarios:</h5>
                    <p>${animal.comentarios}</p>
                </div>
            </div>
        </div>
    </div>`;

// Función para reproducir el sonido del animal al hacer clic en el botón correspondiente
const reproducirSonido = () => {
    const botonesSonido = document.querySelectorAll(".boton-sonido");

    botonesSonido.forEach((boton) => {
        boton.addEventListener("click", () => {
            const audioTag = document.getElementById("player");
            const sonidoSrc = boton.getAttribute("data-sonido");

            // Cargar el nuevo archivo de audio y prepararlo para la reproducción
            audioTag.innerHTML = `<source src="${sonidoSrc}" type="audio/mp3">`;
            audioTag.load();

            // Reproducir el sonido una vez que esté completamente cargado
            audioTag.oncanplaythrough = () => {
                audioTag.play();
            };
        });
    });
};

// Función para validar que todos los campos del formulario estén completados antes de continuar
const validarFormulario = () => {
    // Obtener los valores de los campos del formulario
    const nombre = animalSelect.value;
    const edad = edadSelect.value;
    const comentarios = comentarioTextarea.value;

    // Verificar si alguno de los campos no está seleccionado o está vacío
    if (nombre == 'Seleccione un animal' || edad == 'Seleccione un rango de años' || comentarios == '') {
        // Si falta información, mostrar el modal de advertencia usando Bootstrap
        const modalDatosFaltantes = new bootstrap.Modal(document.getElementById('modalFaltanDatos'));
        modalDatosFaltantes.show();
        return false; // Evitar que el formulario se envíe
    }
    return true; // Permitir que el formulario se envíe si todos los campos están completos
};

// Función para limpiar los campos del formulario después de agregar un animal
const limpiarForm = () => {
    animalSelect.selectedIndex = 0; // Restablecer la selección del nombre del animal
    edadSelect.selectedIndex = 0; // Restablecer la selección de la edad
    comentarioTextarea.value = ""; // Limpiar el campo de comentarios

    // Restablecer la imagen de vista previa a su estado inicial
    vistaPrevia.style.backgroundImage = 'url("./assets/imgs/lion.svg")';
}

// Evento de clic para agregar un nuevo animal
const btnRegistrar = document.getElementById("btnRegistrar");
btnRegistrar.addEventListener('click', (e) => {
    // Evitar el comportamiento predeterminado
    e.preventDefault();

    // Si el formulario es válido, crear el animal y limpiar el formulario
    if (validarFormulario()) {
        crearAnimal(animalSelect.value);
        limpiarForm();
    }
});
