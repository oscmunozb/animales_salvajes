// Importa la clase base 'Animal' desde el archivo 'animal.js'
import Animal from "./animal.js";

// Cada una de las clases extiende de la clase base 'Animal'
class Leon extends Animal {
    // Constructor que inicializa los atributos
    constructor(nombre, edad, img, comentarios, sonido) {
        // Llamada al constructor de la clase base 'Animal' usando 'super'
        super(nombre, edad, img, comentarios, sonido);
    }

    // Método que devuelve el sonido especifico de la clase
    rugir() {
        return this.sonido;
    }
}

class Lobo extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    aullar() {
        return this.sonido;
    }
}

class Oso extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    grunir() {
        return this.sonido;
    }
}

class Serpiente extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    sisear() {
        return this.sonido;
    }
}

class Aguila extends Animal {
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido);
    }

    chillar() {
        return this.sonido;
    }
}

// Exporta las clases 'Leon', 'Lobo', 'Oso', 'Serpiente' y 'Aguila' para que puedan ser importadas en otros módulos.
export { Leon, Lobo, Oso, Serpiente, Aguila }
