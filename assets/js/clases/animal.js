// Definición de la clase base 'Animal'
class Animal {
    // Propiedades privadas
    #nombre
    #edad
    #img
    #comentarios
    #sonido

    // Constructor: inicializa las propiedades privadas con los valores proporcionados
    constructor(nombre, edad, img, comentarios, sonido) {
        this.#nombre = nombre;
        this.#edad = edad;
        this.#img = img;
        this.#comentarios = comentarios;
        this.#sonido = sonido;
    }

    // Getters: permiten acceder a las propiedades privadas desde fuera de la clase
    get nombre() {
        return this.#nombre;
    }

    get edad() {
        return this.#edad;
    }

    get img() {
        return this.#img;
    }

    get comentarios() {
        return this.#comentarios;
    }

    get sonido() {
        return this.#sonido;
    }

    // Setters: permiten modificar las propiedades privadas desde fuera de la clase
    set nombre(value) {
        this.#nombre = value;
    }

    set edad(value) {
        this.#edad = value;
    }

    set img(value) {
        this.#img = value;
    }

    set comentarios(value) {
        this.#comentarios = value;
    }

    set sonido(value) {
        this.#sonido = value;
    }
}

// Exporta la clase Animal como la exportación predeterminada del módulo
export default Animal;
