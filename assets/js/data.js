// IIFE (Immediately Invoked Function Expression) para encapsular la obtención de datos de animales
// Esto crea un espacio de nombres privado para la URL y la función getData
const animalesData = (() => {
    // URL del archivo JSON que contiene los datos de los animales
    const URL = './animales.json';

    // Función asíncrona para obtener los datos de los animales desde el archivo JSON
    const getData = async () => {
        try {
            // Realiza una solicitud HTTP para obtener el archivo JSON
            const respuesta = await fetch(URL);

            // Convierte la respuesta en un objeto JSON
            const data = await respuesta.json();

            // Devuelve la lista de animales desde el JSON
            return data.animales;
        } catch (error) {
            // Maneja errores que ocurran durante la solicitud o la conversión a JSON
            console.error(`No se pudo obtener los datos: ${error.message}`);

            // Devuelve un array vacío en caso de error
            return [];
        }
    };

    // Retorna un objeto con la función getData, exponiéndola públicamente
    return { getData };
})();

// Función asíncrona para capturar información de un determinado animal
// Recibe el nombre del animal y retorna su registro desde el archivo JSON
export const animalData = async (animal) => {
    try {
        // Obtiene los datos de los animales utilizando la función getData encapsulada
        const datos = await animalesData.getData();

        // Encuentra el animal específico en los datos obtenidos
        const registro = datos.find((item) => item.name == animal);

        // Devuelve el registro del animal encontrado.
        return registro;
    } catch (error) {
        // Maneja cualquier error que ocurra durante la búsqueda del animal
        console.error(error.message);

        // Devuelve null en caso de error
        return null;
    }
}
