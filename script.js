/* ----------------------- ADIVINANZAS ----------------------- */
const adivinanzas = [
    {p:"Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.", r:"pera"},
    {p:"Vuelo sin alas, lloro sin ojos.", r:"nube"},
    {p:"Tiene dientes pero no muerde.", r:"peine"}
];
let actual = Math.floor(Math.random()*adivinanzas.length);
document.getElementById("pregunta").textContent = adivinanzas[actual].p;

function comprobar() {
    let resp = document.getElementById("respuesta").value.toLowerCase();
    if(resp === adivinanzas[actual].r) alert("¡Correcto! 🌟");
    else alert("Intenta otra vez 😊");
}

/* ----------------------- SUMA MÁGICA ----------------------- */
let a = Math.floor(Math.random()*10);
let b = Math.floor(Math.random()*10);
document.getElementById("sumita").textContent = `¿Cuánto es ${a} + ${b}?`;

function verificarSuma() {
    let resp = parseInt(document.getElementById("resSuma").value);
    if(resp === a+b) alert("¡Muy bien! 🌟");
    else alert("Sigue intentando 😊");
}

/* ----------------------- MEMORIA ----------------------- */
let emojis = ["🐶","🐱","🐰","🐸","🐵","🐼","🐹","🦊"];
emojis = [...emojis, ...emojis];
let primera = null, segunda = null, bloqueo = false;

function iniciarMemoria() {
    const tablero = document.getElementById("memoria");
    tablero.innerHTML = "";
    let mezclados = emojis.sort(()=>Math.random()-0.5);

    mezclados.forEach((em) => {
        const carta = document.createElement("div");
        carta.className = "carta";
        carta.dataset.valor = em;
        carta.onclick = ()=> voltear(carta);
        tablero.appendChild(carta);
    });
}

function voltear(carta) {
    if(bloqueo || carta.classList.contains("volteada")) return;

    carta.textContent = carta.dataset.valor;
    carta.classList.add("volteada");

    if(!primera){
        primera = carta;
    } else {
        segunda = carta;
        bloqueo = true;
        setTimeout(()=> {
            if(primera.dataset.valor !== segunda.dataset.valor){
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

let palabraActual, palabraMostrar, intentos, letrasIncorrectas;

function iniciarAhorcado(){
    const index = Math.floor(Math.random()*palabras.length);
    palabraActual = palabras[index].pal;
    palabraMostrar = "_ ".repeat(palabraActual.length).trim();
    intentos = 6;
    letrasIncorrectas = [];

    document.getElementById("ahorcadoPalabra").textContent = palabraMostrar;
    document.getElementById("ahorcadoIntentos").textContent = `Intentos restantes: ${intentos}`;
    document.getElementById("ahorcadoLetras").textContent = `Letras incorrectas: ${letrasIncorrectas.join(", ")}`;
}

function adivinarLetra(){
    const input = document.getElementById("ahorcadoInput");
    const letra = input.value.toUpperCase();
    input.value = "";

    if(!letra || letra.length > 1){
        alert("Ingresa solo una letra");
        return;
    }

    if(palabraActual.includes(letra)){
        let nuevoMostrar = "";
        for(let i=0; i<palabraActual.length; i++){
            if(palabraActual[i] === letra){
                nuevoMostrar += letra + " ";
            } else {
                nuevoMostrar += palabraMostrar[2*i] + " ";
            }
        }
        palabraMostrar = nuevoMostrar.trim();
        document.getElementById("ahorcadoPalabra").textContent = palabraMostrar;

        if(!palabraMostrar.includes("_")){
            alert(`🎉 ¡Ganaste! La palabra era ${palabraActual}`);
            iniciarAhorcado();
        }
    } else {
        if(!letrasIncorrectas.includes(letra)){
            letrasIncorrectas.push(letra);
            intentos--;
        }
        document.getElementById("ahorcadoIntentos").textContent = `Intentos restantes: ${intentos}`;
        document.getElementById("ahorcadoLetras").textContent = `Letras incorrectas: ${letrasIncorrectas.join(", ")}`;

        if(intentos === 0){
            alert(`😢 Perdiste. La palabra era ${palabraActual}`);
            iniciarAhorcado();
        }
    }
}

// Inicializar al cargar la página
window.onload = function(){
    iniciarAhorcado();
};
