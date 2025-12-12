/* ----------------------- ADIVINANZAS ----------------------- */
const adivinanzas = [
    {p:"Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.", r:"pera"},
    {p:"Vuelo sin alas, lloro sin ojos.", r:"nube"},
    {p:"Tiene dientes pero no muerde.", r:"peine"}
];

let actual = Math.floor(Math.random() * adivinanzas.length);
document.getElementById("pregunta").textContent = adivinanzas[actual].p;

function comprobar() {
    let resp = document.getElementById("respuesta").value.toLowerCase().trim();

    if (!resp) {
        alert("Escribe una respuesta 😊");
        return;
    }

    if (resp === adivinanzas[actual].r) {
        alert("¡Correcto! 🌟");
    } else {
        alert("Intenta otra vez 😊");
    }
}

/* ----------------------- SUMA MÁGICA ----------------------- */
let a = Math.floor(Math.random() * 10);
let b = Math.floor(Math.random() * 10);

document.getElementById("sumita").textContent = `¿Cuánto es ${a} + ${b}?`;

function verificarSuma() {
    let resp = parseInt(document.getElementById("resSuma").value);

    if (isNaN(resp)) {
        alert("Ingresa un número 😊");
        return;
    }

    if (resp === a + b) alert("¡Muy bien! 🌟");
    else alert("Sigue intentando 😊");
}

/* ----------------------- MEMORIA ----------------------- */
let emojis = ["🐶","🐱","🐰","🐸","🐵","🐼","🐹","🦊"];
emojis = [...emojis, ...emojis];

let primera = null;
let segunda = null;
let bloqueo = false;

function iniciarMemoria() {
    const tablero = document.getElementById("memoria");
    tablero.innerHTML = "";

    primera = null;
    segunda = null;
    bloqueo = false;

    let mezclados = [...emojis].sort(() => Math.random() - 0.5);

    mezclados.forEach((em) => {
        const carta = document.createElement("div");
        carta.className = "carta";
        carta.dataset.valor = em;
        carta.textContent = ""; 
        carta.onclick = () => voltear(carta);
        tablero.appendChild(carta);
    });
}

function voltear(carta) {
    if (bloqueo || carta.classList.contains("volteada")) return;

    carta.textContent = carta.dataset.valor;
    carta.classList.add("volteada");

    if (!primera) {
        primera = carta;
    } else {
        segunda = carta;
        bloqueo = true;

        setTimeout(() => {
            if (primera.dataset.valor !== segunda.dataset.valor) {
                primera.textContent = "";
                segunda.textContent = "";
                primera.classList.remove("volteada");
                segunda.classList.remove("volteada");
            }

            primera = null;
            segunda = null;
            bloqueo = false;
        }, 700);
    }
}

iniciarMemoria();

/* ----------------------- AHORCADO EDUCATIVO ----------------------- */
const palabras = [
    {pal: "MANZANA", cat:"Fruta"},
    {pal: "PERRO", cat:"Animal"},
    {pal: "SILLA", cat:"Objeto"},
    {pal: "ELEFANTE", cat:"Animal"},
    {pal: "PLATANO", cat:"Fruta"},
    {pal: "LIBRO", cat:"Objeto"},
    {pal: "GATO", cat:"Animal"},
    {pal: "NARANJA", cat:"Fruta"}
];

let palabraActual = "";
let palabraArray = [];
let intentos = 6;
let letrasIncorrectas = [];

function iniciarAhorcado() {
    const index = Math.floor(Math.random() * palabras.length);

    palabraActual = palabras[index].pal;
    palabraArray = Array(palabraActual.length).fill("_");

    intentos = 6;
    letrasIncorrectas = [];

    actualizarPantallaAhorcado();
}

function actualizarPantallaAhorcado() {
    document.getElementById("ahorcadoPalabra").textContent = palabraArray.join(" ");
    document.getElementById("ahorcadoIntentos").textContent = `Intentos restantes: ${intentos}`;
    document.getElementById("ahorcadoLetras").textContent = `Letras incorrectas: ${letrasIncorrectas.join(", ")}`;
}

function adivinarLetra() {
    const input = document.getElementById("ahorcadoInput");
    const letra = input.value.toUpperCase().trim();
    input.value = "";

    if (!letra || letra.length !== 1 || !/[A-ZÑ]/.test(letra)) {
        alert("Ingresa solo una letra válida");
        return;
    }

    if (palabraActual.includes(letra)) {
        palabraActual.split("").forEach((c, i) => {
            if (c === letra) palabraArray[i] = letra;
        });

        actualizarPantallaAhorcado();

        if (!palabraArray.includes("_")) {
            alert(`🎉 ¡Ganaste! La palabra era ${palabraActual}`);
            iniciarAhorcado();
        }

    } else {
        if (!letrasIncorrectas.includes(letra)) {
            letrasIncorrectas.push(letra);
            intentos--;
        }

        actualizarPantallaAhorcado();

        if (intentos <= 0) {
            alert(`😢 Perdiste. La palabra era ${palabraActual}`);
            iniciarAhorcado();
        }
    }
}

window.onload = function () {
    iniciarAhorcado();
};

/* ----------------------- MÚSICA ----------------------- */
let musica1 = document.getElementById("musica1");
let musica2 = document.getElementById("musica2");

function reproducir1() {
    musica2.pause();
    musica2.currentTime = 0;
    musica1.play();
}

function reproducir2() {
    musica1.pause();
    musica1.currentTime = 0;
    musica2.play();
}

function pausarTodo() {
    musica1.pause();
    musica2.pause();
}
