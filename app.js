// ==========================================================================
// LÓGICA DE LA APLICACIÓN: RED DE CURIOSIDADES (TEMA CLARO Y MEJORADO)
// ==========================================================================

// 1. CONFIGURACIÓN E INICIALIZACIÓN DE FIREBASE (Paso 4)
const firebaseConfig = {
  apiKey: "AIzaSyCtLNDnTACNEHibIuCRPASlnp06kFCSfNg",
  authDomain: "red-curiosidades.firebaseapp.com",
  databaseURL: "https://red-curiosidades-default-rtdb.firebaseio.com",
  projectId: "red-curiosidades",
  storageBucket: "red-curiosidades.firebasestorage.app",
  messagingSenderId: "750745335527",
  appId: "1:750745335527:web:65611a192489b349035442"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 2. BANCO DE PREGUNTAS CURIOAS (Paso 6 - Mejorado)
const bancoPreguntas = [
    "Si el PIB de Colombia fuera una persona, ¿qué tan dramática sería su reacción cada vez que sube la inflación?",
    "¿Cuántas reuniones de seguimiento crees que necesitaría Dios para aprobar la creación del universo si hubiera tenido un departamento de administración?",
    "Si la contabilidad fuera un deporte olímpico, ¿en qué evento crees que Colombia ganaría medalla de oro?",
    "¿Qué pasaría si un economista, un administrador y un contador se perdieran juntos en el bosque? ¿Quién sobrevive más tiempo y por qué?",
    "Si el balance general de tu vida personal fuera auditado hoy, ¿qué rubros estarían en rojo?",
    "¿Cuál crees que es el activo más sobrevalorado de la historia: el tulipán holandés, el Bitcoin en 2021 o tu motivación un lunes a las 7am?",
    "Si la economía colombiana fuera un estudiante de la Nacional, ¿en qué semestre estaría y cuántas materias habría perdido?",
    "¿Qué empresa famosa crees que quebraría en menos de una semana si la administrara tu yo de hace cinco años?",
    "Si la oferta y la demanda fueran dos personas en una relación, ¿cómo describirías su dinámica amorosa?",
    "¿Cuánto cobrarías por hora si pudieras facturarle a tu familia cada vez que te piden que les expliques por qué sube el dólar?",
    "Si los perros pudieran votar, ¿qué partido político crees que ganarían las elecciones?",
    "¿Cuántos patos crees que podrías cargar al mismo tiempo antes de rendirte?",
    "Si tuvieras que oler igual a un alimento por el resto de tu vida, ¿cuál elegirías para no arruinar tu vida social?",
    "¿Pelearías contra un caballo del tamaño de un gato o contra un gato del tamaño de un caballo?",
    "Si el Wi-Fi dejara de existir mañana, ¿en cuántos días colapsarías completamente como persona?",
    "¿Qué trabajo crees que harías mejor: catador oficial de colchones o juez de concursos de bostezos?",
    "Si tu personalidad fuera un sonido de notificación, ¿cuál sería?",
    "¿Cuánto dinero necesitarías para comerte un insecto frente a todo el grupo ahora mismo?",
    "Si pudieras reemplazar todas las escaleras del mundo por un solo objeto alternativo, ¿qué pondrías?",
    "¿Qué harías si te despiertas mañana y descubres que todos los demás humanos del planeta desaparecieron pero los animales siguen ahí?",
    "¿Cuál es tu talento secreto que casi nadie en la UACE sabe que tienes?",
    "¿A qué le tienes un miedo irracional que sabes que no tiene mucho sentido?",
    "Si pudieras eliminar una materia de la universidad para siempre, ¿cuál sería?",
    "¿Cuál es la opinión impopular que defiendes con más convicción?",
    "¿Qué canción te sería imposible no cantar si la pusieran en este momento?",
    "¿En qué momento de tu vida has actuado con más valentía?",
    "¿Cuál es la habilidad que más envidia te da cuando la ves en otras personas?",
    "¿Qué harías mañana si supieras que no puedes fallar?",
    "¿Cuál es la decisión más impulsiva que has tomado y de la que no te arrepientes?",
    "Si tu forma de estudiar fuera un animal, ¿cuál sería y por qué?",
    "¿Cuál es la cosa más rara que comes o la combinación de comida más extraña que te gusta?",
    "¿Qué serie, película o libro cambió genuinamente tu forma de pensar?",
    "¿En qué momento de tu vida has reído más fuerte o más tiempo sin poder parar?",
    "Si tuvieras que vivir en otro país por un año obligatoriamente, ¿a cuál irías y por qué?",
    "¿Qué creías de niño que era verdad absoluta y hoy sabes que estabas completamente equivocado?",
    "¿Cuál es el consejo que más odias recibir pero que en el fondo sabes que es correcto?",
    "¿Qué parte de tu rutina diaria te genera más culpa pero igual sigues haciendo?",
    "Si pudieras tener una conversación de una hora con cualquier persona viva o muerta, ¿con quién sería?",
    "¿Cuál es la cosa más pequeña que tiene el poder de arruinarte el día?",
    "¿Qué es lo primero que harías si te dieran un mes libre pagado sin ninguna obligación?"
];

// 3. REFERENCIAS A ELEMENTOS DE LA INTERFAZ (DOM)
// Vistas principales
const vistaParticipante = document.getElementById("vista-participante");
const vistaPantallaGrande = document.getElementById("vista-pantalla-grande");

// Secciones del Participante
const seccionRegistro = document.getElementById("seccion-registro");
const seccionEspera = document.getElementById("seccion-espera");
const seccionJuego = document.getElementById("seccion-juego");
const seccionFin = document.getElementById("seccion-fin");

// Formulario dinámico del Participante
const formularioRegistro = document.getElementById("formulario-registro");
const preguntasDinamicasContenedor = document.getElementById("preguntas-dinamicas");
const inputNombre = document.getElementById("reg-nombre");
const nombreEspera = document.getElementById("nombre-espera");

// Elementos de Juego Activo en Celular
const listaRespuestas = document.getElementById("lista-respuestas");
const notificacionMatch = document.getElementById("notificacion-match");
const textoNotificacion = document.getElementById("texto-notificacion");
const btnConfirmarMatch = document.getElementById("btn-confirmar-match");
const btnRechazarMatch = document.getElementById("btn-rechazar-match");

// Modal del Celular
const modalMatch = document.getElementById("modal-match");
const modalDatoTexto = document.getElementById("modal-dato-texto");
const selectorParticipantesContainer = document.getElementById("selector-participantes-container");
const btnEnviarPropuesta = document.getElementById("btn-enviar-propuesta");
const btnCerrarModal = document.getElementById("btn-cerrar-modal");

// Secciones de la Pantalla Grande (Moderador / Proyector)
const seccionModerador = document.getElementById("seccion-moderador");
const seccionJuegoGrande = document.getElementById("seccion-juego-grande");
const seccionCierreGrande = document.getElementById("seccion-cierre-grande");

const contadorRegistrados = document.getElementById("contador-registrados");
const listaParticipantesRegistrados = document.getElementById("lista-participantes-registrados");
const btnIniciarJuego = document.getElementById("btn-iniciar-juego");
const btnFinalizarJuego = document.getElementById("btn-finalizar-juego");

// Cronómetro y Marcador en Pantalla Grande
const elCronometro = document.getElementById("cronometro");
const elLeaderboard = document.getElementById("leaderboard");
const elLeaderboardFinal = document.getElementById("leaderboard-final");

// 4. VARIABLES DE ESTADO LOCAL
let esVistaPantallaGrande = false;
let usuarioActual = null;
let idUsuarioActual = localStorage.getItem("red_curiosidades_id") || null;
let nombreUsuarioActual = localStorage.getItem("red_curiosidades_nombre") || "";

let todosLosParticipantes = {};
let respuestaSeleccionada = null;
let intervaloCronometro = null;
let preguntasAsignadas = []; // Guardará las 3 preguntas elegidas al azar para el registro
let propuestaEnviadaLocalmente = false;
let compañeroSeleccionadoId = null;
let respuestasAnonimasCache = null;

// ==========================================
// DETECCIÓN DE RUTA Y FLUJO PRINCIPAL
// ==========================================
function inicializarRutaYVistas() {
    const params = new URLSearchParams(window.location.search);
    esVistaPantallaGrande = params.get("pantalla") === "true";

    if (esVistaPantallaGrande) {
        vistaPantallaGrande.classList.remove("oculta");
        vistaParticipante.classList.add("oculta");
        inicializarPantallaGrande();
    } else {
        vistaParticipante.classList.remove("oculta");
        vistaPantallaGrande.classList.add("oculta");
        inicializarParticipante();
    }
}

// ==========================================
// FLUJO: PANTALLA GRANDE / MODERADOR
// ==========================================
function inicializarPantallaGrande() {
    // Generar código QR dinámicamente usando la URL de los participantes (sin query string)
    const urlParticipantes = window.location.origin + window.location.pathname;
    const contQr = document.getElementById("contenedor-qr-lobby");
    if (contQr) {
        contQr.innerHTML = "";
        const imgQr = document.createElement("img");
        imgQr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(urlParticipantes)}`;
        imgQr.alt = "Código QR para jugar";
        contQr.appendChild(imgQr);
    }

    // Escuchar participantes registrados
    db.ref("participantes").on("value", (snapshot) => {
        todosLosParticipantes = snapshot.val() || {};
        const listaIds = Object.keys(todosLosParticipantes);
        
        contadorRegistrados.textContent = listaIds.length;
        listaParticipantesRegistrados.innerHTML = "";
        
        listaIds.forEach(id => {
            const li = document.createElement("li");
            li.textContent = `👤 ${todosLosParticipantes[id].nombre}`;
            listaParticipantesRegistrados.appendChild(li);
        });

        actualizarLeaderboardVisual();
    });

    // Iniciar Juego (Moderador)
    btnIniciarJuego.addEventListener("click", () => {
        const numParticipantes = Object.keys(todosLosParticipantes).length;
        if (numParticipantes < 2) {
            alert("Se necesitan al menos 2 participantes registrados para iniciar el juego.");
            return;
        }

        const ahora = Date.now();

        db.ref("estado_juego").set({
            iniciado: true,
            finalizado: false,
            timestamp_inicio: ahora
        });
    });


    // Botón para finalizar anticipadamente el juego
    btnFinalizarJuego.addEventListener("click", () => {
        if (confirm("¿Seguro que deseas finalizar el juego ahora y pasar a las revelaciones finales?")) {
            db.ref("estado_juego/finalizado").set(true);
        }
    });

    // Configurar botones de reinicio en pantalla grande
    const btnReiniciarMod = document.getElementById("btn-reiniciar-todo-mod");
    const btnReiniciarJuego = document.getElementById("btn-reiniciar-todo-juego");
    const btnReiniciarCierre = document.getElementById("btn-reiniciar-todo-cierre");

    [btnReiniciarMod, btnReiniciarJuego, btnReiniciarCierre].forEach(btn => {
        if (btn) {
            btn.addEventListener("click", reiniciarTodoElJuego);
        }
    });

    // Escuchar estado global del juego
    db.ref("estado_juego").on("value", (snapshot) => {
        const estado = snapshot.val();
        if (estado && estado.iniciado) {
            seccionModerador.classList.add("oculta");
            
            if (estado.finalizado) {
                seccionJuegoGrande.classList.add("oculta");
                seccionCierreGrande.classList.remove("oculta");
                pararCronometroLocal();
                actualizarLeaderboardVisual(true);
                inicializarGrafoVisual(true); // Grafo de cierre con respuestas reveladas
                iniciarCarruselAutomatico();  // Activar la revelación autogiratoria
            } else {
                seccionJuegoGrande.classList.remove("oculta");
                seccionCierreGrande.classList.add("oculta");
                if (intervaloCarrusel) clearInterval(intervaloCarrusel);
                iniciarCronometroLocal(estado.timestamp_inicio);
                inicializarGrafoVisual(false); // Grafo activo
            }
        } else {
            seccionModerador.classList.remove("oculta");
            seccionJuegoGrande.classList.add("oculta");
            seccionCierreGrande.classList.add("oculta");
            pararCronometroLocal();
            if (intervaloCarrusel) clearInterval(intervaloCarrusel);
        }
    });
}

// Cronómetro (Cronometra el tiempo transcurrido desde el inicio de la actividad)
function iniciarCronometroLocal(timestampInicio) {
    pararCronometroLocal();

    function actualizarTiempo() {
        const ahora = Date.now();
        const diferenciaMs = ahora - timestampInicio;

        if (diferenciaMs < 0) {
            elCronometro.textContent = "00:00";
            return;
        }

        const minutos = Math.floor(diferenciaMs / 60000);
        const segundos = Math.floor((diferenciaMs % 60000) / 1000);

        const strMinutos = minutos.toString().padStart(2, '0');
        const strSegundos = segundos.toString().padStart(2, '0');

        elCronometro.textContent = `${strMinutos}:${strSegundos}`;
    }

    actualizarTiempo();
    intervaloCronometro = setInterval(actualizarTiempo, 1000);
}

function pararCronometroLocal() {
    if (intervaloCronometro) {
        clearInterval(intervaloCronometro);
        intervaloCronometro = null;
    }
}

// Dibujar Leaderboard
function actualizarLeaderboardVisual(esFinal = false) {
    const contenedor = esFinal ? elLeaderboardFinal : elLeaderboard;
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const listaJugadores = Object.keys(todosLosParticipantes).map(id => ({
        id: id,
        nombre: todosLosParticipantes[id].nombre,
        puntos: todosLosParticipantes[id].puntos || 0
    }));

    listaJugadores.sort((a, b) => b.puntos - a.puntos);

    if (esFinal) {
        // --- LOGICA DE PODIO 3D PANTALLA FINAL ---
        // Primer Lugar
        const podio1Nombre = document.getElementById("podio-1-nombre");
        const podio1Puntos = document.getElementById("podio-1-puntos");
        if (listaJugadores[0]) {
            podio1Nombre.textContent = listaJugadores[0].nombre;
            podio1Puntos.textContent = `${listaJugadores[0].puntos} pts`;
        } else {
            podio1Nombre.textContent = "Vacío";
            podio1Puntos.textContent = "0 pts";
        }

        // Segundo Lugar
        const podio2Nombre = document.getElementById("podio-2-nombre");
        const podio2Puntos = document.getElementById("podio-2-puntos");
        if (listaJugadores[1]) {
            podio2Nombre.textContent = listaJugadores[1].nombre;
            podio2Puntos.textContent = `${listaJugadores[1].puntos} pts`;
        } else {
            podio2Nombre.textContent = "Vacío";
            podio2Puntos.textContent = "0 pts";
        }

        // Tercer Lugar
        const podio3Nombre = document.getElementById("podio-3-nombre");
        const podio3Puntos = document.getElementById("podio-3-puntos");
        if (listaJugadores[2]) {
            podio3Nombre.textContent = listaJugadores[2].nombre;
            podio3Puntos.textContent = `${listaJugadores[2].puntos} pts`;
        } else {
            podio3Nombre.textContent = "Vacío";
            podio3Puntos.textContent = "0 pts";
        }

        // Pintar el resto de jugadores (Puesto 4 en adelante) en la lista
        const restoJugadores = listaJugadores.slice(3);
        restoJugadores.forEach((jugador, index) => {
            const pos = index + 4;
            const item = document.createElement("li");
            item.className = "leaderboard-item";
            item.innerHTML = `
                <div class="posicion-nombre">
                    <span class="posicion">${pos}</span>
                    <span class="leaderboard-nombre">${jugador.nombre}</span>
                </div>
                <span class="leaderboard-puntos">${jugador.puntos} pts</span>
            `;
            contenedor.appendChild(item);
        });

        // Lanzar la fiesta de confeti en pantalla
        lanzarConfeti();

    } else {
        // --- LOGICA DE MARCADOR NORMAL DURANTE EL JUEGO ---
        listaJugadores.forEach((jugador, index) => {
            const pos = index + 1;
            const item = document.createElement("li");
            
            let claseTop = "";
            if (pos === 1) claseTop = "top-1";
            else if (pos === 2) claseTop = "top-2";
            else if (pos === 3) claseTop = "top-3";

            item.className = `leaderboard-item ${claseTop}`;
            item.innerHTML = `
                <div class="posicion-nombre">
                    <span class="posicion">${pos}</span>
                    <span class="leaderboard-nombre">${jugador.nombre}</span>
                </div>
                <span class="leaderboard-puntos">${jugador.puntos} pts</span>
            `;
            contenedor.appendChild(item);
        });
    }
}

// ==========================================
// FLUJO: PARTICIPANTE (CELULAR)
// ==========================================
function inicializarParticipante() {
    // Si ya existe sesión local, ocultamos el registro de inmediato para evitar el parpadeo visual
    if (idUsuarioActual) {
        seccionRegistro.classList.add("oculta");
        seccionEspera.classList.remove("oculta");
        nombreEspera.textContent = nombreUsuarioActual || "Cargando...";
    } else {
        seccionRegistro.classList.remove("oculta");
        seccionEspera.classList.add("oculta");
    }

    // 1. Generar preguntas aleatorias del banco para el formulario (solo si no hay sesión iniciada)
    if (!idUsuarioActual) {
        generarPreguntasRegistroDinamicas();
    }

    // 2. Manejar registro
    formularioRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombreVal = inputNombre.value.trim();
        const r1Val = document.getElementById("reg-p-0").value.trim();
        const r2Val = document.getElementById("reg-p-1").value.trim();
        const r3Val = document.getElementById("reg-p-2").value.trim();

        const nuevoParticipanteRef = db.ref("participantes").push();
        const nuevoId = nuevoParticipanteRef.key;

        // Estructura de preguntas personalizadas guardadas en Firebase
        const datosParticipante = {
            nombre: nombreVal,
            preguntas: {
                q1: { texto: preguntasAsignadas[0], respuesta: r1Val },
                q2: { texto: preguntasAsignadas[1], respuesta: r2Val },
                q3: { texto: preguntasAsignadas[2], respuesta: r3Val }
            },
            puntos: 0
        };

        nuevoParticipanteRef.set(datosParticipante)
            .then(() => {
                localStorage.setItem("red_curiosidades_id", nuevoId);
                localStorage.setItem("red_curiosidades_nombre", nombreVal);
                idUsuarioActual = nuevoId;
                nombreUsuarioActual = nombreVal;
                usuarioActual = datosParticipante;
                irAPantallaEspera(nombreVal);
            })
            .catch((err) => {
                alert("Error de registro.");
                console.error(err);
            });
    });

    comprobarSesionExistente();

    // Escuchar estado global del juego
    db.ref("estado_juego").on("value", (snapshot) => {
        const estado = snapshot.val();
        if (estado && estado.iniciado) {
            if (estado.finalizado) {
                mostrarPantallaCierreParticipante();
            } else {
                if (idUsuarioActual) {
                    seccionRegistro.classList.add("oculta");
                    seccionEspera.classList.add("oculta");
                    seccionJuego.classList.remove("oculta");
                    seccionFin.classList.add("oculta");
                    
                    iniciarJuegoParticipante();
                }
            }
        } else {
            // El juego no ha iniciado o se ha reiniciado
            respuestasAnonimasCache = null;
            if (idUsuarioActual) {
                irAPantallaEspera(nombreUsuarioActual || (usuarioActual ? usuarioActual.nombre : "Participante"));
            } else {
                seccionRegistro.classList.remove("oculta");
                seccionEspera.classList.add("oculta");
                seccionJuego.classList.add("oculta");
                seccionFin.classList.add("oculta");
            }
        }
    });
}

// Inyectar preguntas balanceadas y aleatorias en el HTML
function generarPreguntasRegistroDinamicas() {
    preguntasDinamicasContenedor.innerHTML = "<p style='text-align:center;color:var(--color-texto-secundario);'>Cargando preguntas...</p>";
    
    // Obtener participantes registrados para ver qué preguntas tienen asignadas
    db.ref("participantes").once("value", (snapshot) => {
        const participantes = snapshot.val() || {};
        
        // Contar cuántas veces se ha asignado cada pregunta del banco
        const conteoPreguntas = {};
        bancoPreguntas.forEach(q => {
            conteoPreguntas[q] = 0;
        });

        Object.keys(participantes).forEach(pId => {
            const p = participantes[pId];
            if (p.preguntas) {
                Object.keys(p.preguntas).forEach(qKey => {
                    const textoPreg = p.preguntas[qKey].texto;
                    if (textoPreg in conteoPreguntas) {
                        conteoPreguntas[textoPreg]++;
                    }
                });
            }
        });

        // Ordenar las preguntas del banco por asignaciones (menor a mayor)
        const preguntasOrdenadas = [...bancoPreguntas].sort((a, b) => conteoPreguntas[a] - conteoPreguntas[b]);

        // Tomar un grupo de las menos asignadas (ej. las primeras 12 para dar variedad aleatoria)
        const poolMenosAsignadas = preguntasOrdenadas.slice(0, 12);
        shuffle(poolMenosAsignadas);
        
        // Tomar las 3 primeras del pool mezclado
        preguntasAsignadas = poolMenosAsignadas.slice(0, 3);

        preguntasDinamicasContenedor.innerHTML = "";
        preguntasAsignadas.forEach((preg, idx) => {
            const div = document.createElement("div");
            div.className = "campo";
            div.innerHTML = `
                <label for="reg-p-${idx}">${preg}</label>
                <input type="text" id="reg-p-${idx}" placeholder="Tu respuesta..." required autocomplete="off">
            `;
            preguntasDinamicasContenedor.appendChild(div);
        });
    }).catch(err => {
        console.error("Error al cargar preguntas balanceadas, usando fallback local:", err);
        // Fallback: si falla Firebase, elegir al azar del banco localmente de inmediato
        const indices = Array.from({length: bancoPreguntas.length}, (_, i) => i);
        shuffle(indices);
        preguntasAsignadas = [
            bancoPreguntas[indices[0]],
            bancoPreguntas[indices[1]],
            bancoPreguntas[indices[2]]
        ];
        
        preguntasDinamicasContenedor.innerHTML = "";
        preguntasAsignadas.forEach((preg, idx) => {
            const div = document.createElement("div");
            div.className = "campo";
            div.innerHTML = `
                <label for="reg-p-${idx}">${preg}</label>
                <input type="text" id="reg-p-${idx}" placeholder="Tu respuesta..." required autocomplete="off">
            `;
            preguntasDinamicasContenedor.appendChild(div);
        });
    });
}

function irAPantallaEspera(nombre) {
    nombreEspera.textContent = nombre;
    seccionRegistro.classList.add("oculta");
    seccionEspera.classList.remove("oculta");
    seccionJuego.classList.add("oculta");
}

// Helper para rellenar y mostrar la pantalla de cierre móvil (Ganador Especial vs Normal)
function mostrarPantallaCierreParticipante() {
    seccionRegistro.classList.add("oculta");
    seccionEspera.classList.add("oculta");
    seccionJuego.classList.add("oculta");
    seccionFin.classList.remove("oculta");
    
    if (idUsuarioActual) {
        db.ref("participantes").once("value", (snapPart) => {
            const todos = snapPart.val() || {};
            const puntosUsuario = todos[idUsuarioActual]?.puntos || 0;
            
            // Encontrar la puntuación máxima
            let maxPts = -999;
            Object.keys(todos).forEach(id => {
                const pts = todos[id].puntos || 0;
                if (pts > maxPts) {
                    maxPts = pts;
                }
            });
            
            // Determinar si soy el ganador (o empato en el primer lugar)
            const esGanador = puntosUsuario === maxPts && maxPts > 0;
            
            const elGanadorDiv = document.getElementById("vista-fin-ganador");
            const elNormalDiv = document.getElementById("vista-fin-normal");
            
            if (esGanador) {
                if (elGanadorDiv) elGanadorDiv.classList.remove("oculta");
                if (elNormalDiv) elNormalDiv.classList.add("oculta");
                const elPuntosGanador = document.getElementById("puntos-finales-ganador");
                if (elPuntosGanador) elPuntosGanador.textContent = puntosUsuario;
            } else {
                if (elGanadorDiv) elGanadorDiv.classList.add("oculta");
                if (elNormalDiv) elNormalDiv.classList.remove("oculta");
                const elPuntosNormal = document.getElementById("puntos-finales");
                if (elPuntosNormal) elPuntosNormal.textContent = puntosUsuario;
            }
        });
    }
}

function comprobarSesionExistente() {
    const idGuardado = localStorage.getItem("red_curiosidades_id");
    if (idGuardado) {
        // Usamos .on() para escuchar si este participante específico es eliminado de Firebase en tiempo real
        db.ref(`participantes/${idGuardado}`).on("value", (snapshot) => {
            const datos = snapshot.val();
            if (datos) {
                idUsuarioActual = idGuardado;
                usuarioActual = datos;
                
                // Si el juego está en curso, mandarlo a la pantalla que corresponda
                db.ref("estado_juego").once("value", (snapEstado) => {
                    const est = snapEstado.val();
                    if (est && est.iniciado) {
                        if (est.finalizado) {
                            mostrarPantallaCierreParticipante();
                        } else {
                            seccionRegistro.classList.add("oculta");
                            seccionEspera.classList.add("oculta");
                            seccionJuego.classList.remove("oculta");
                            seccionFin.classList.add("oculta");
                            iniciarJuegoParticipante();
                        }
                    } else {
                        irAPantallaEspera(datos.nombre);
                    }
                });
            } else {
                // Si el participante ya no existe (porque se reinició la BD), limpiamos sesión
                localStorage.removeItem("red_curiosidades_id");
                localStorage.removeItem("red_curiosidades_nombre");
                idUsuarioActual = null;
                nombreUsuarioActual = "";
                usuarioActual = null;
                respuestasAnonimasCache = null;
                
                // Redirigir a registro y generar nuevas preguntas curiosas
                seccionRegistro.classList.remove("oculta");
                seccionEspera.classList.add("oculta");
                seccionJuego.classList.add("oculta");
                seccionFin.classList.add("oculta");
                generarPreguntasRegistroDinamicas();
            }
        });
    }
}

// ==========================================================================
// FASE 1: JUEGO ACTIVO DEL PARTICIPANTE (CELULAR)
// ==========================================================================
function iniciarJuegoParticipante() {
    document.getElementById("jugador-activo-nombre").textContent = usuarioActual.nombre;
    
    db.ref(`participantes/${idUsuarioActual}/puntos`).on("value", (snapPuntos) => {
        document.getElementById("jugador-activo-puntos").textContent = `${snapPuntos.val() || 0} pts`;
    });

    cargarRespuestasAnonimasYCompañeros();
    escucharMatchesPropuestosHaciaMi();
    escucharResolucionDeMiPropuesta();
}

function inicializarRespuestasCache(participantes) {
    let respuestasAnonimas = [];

    Object.keys(participantes).forEach(partId => {
        if (partId === idUsuarioActual) return;

        const part = participantes[partId];
        const preg = part.preguntas || {};

        // Cargar dinámicamente las preguntas asignadas a este participante
        Object.keys(preg).forEach((pClave) => {
            const itemPreg = preg[pClave];
            if (itemPreg && itemPreg.respuesta) {
                const idRespuestaUnica = `${partId}_${pClave}`;
                respuestasAnonimas.push({
                    id: idRespuestaUnica,
                    propietarioId: partId,
                    preguntaId: pClave,
                    preguntaTexto: itemPreg.texto,
                    texto: itemPreg.respuesta,
                    yaAdivinada: false
                });
            }
        });
    });

    shuffle(respuestasAnonimas);
    respuestasAnonimasCache = respuestasAnonimas;
}

function pintarRespuestas() {
    if (!respuestasAnonimasCache) return;

    listaRespuestas.innerHTML = "";
    respuestasAnonimasCache.forEach(item => {
        const div = document.createElement("div");
        div.className = `tarjeta-respuesta ${item.yaAdivinada ? 'ya-adivinada' : ''}`;
        
        div.innerHTML = `
            <span class="tag-pregunta">${item.preguntaTexto}</span>
            <p class="texto-respuesta">"${item.texto}"</p>
        `;

        if (!item.yaAdivinada) {
            div.addEventListener("click", () => {
                abrirModalMatch(item);
            });
        }

        listaRespuestas.appendChild(div);
    });
}

function cargarRespuestasAnonimasYCompañeros() {
    // Escuchamos participantes para censo y para iniciar el caché
    db.ref("participantes").on("value", (snapshot) => {
        const participantes = snapshot.val() || {};
        todosLosParticipantes = participantes;

        // Si aún no hemos inicializado el caché de respuestas, lo hacemos ahora
        if (!respuestasAnonimasCache && Object.keys(participantes).length > 0) {
            inicializarRespuestasCache(participantes);
            pintarRespuestas();
        }
    });

    // Escuchamos nuestros aciertos en tiempo real para sombrear sin rebarajar
    db.ref(`participantes/${idUsuarioActual}/aciertos`).on("value", (snapAciertos) => {
        const aciertos = snapAciertos.val() || {};
        if (respuestasAnonimasCache) {
            respuestasAnonimasCache.forEach(item => {
                item.yaAdivinada = aciertos[item.id] === true;
            });
            pintarRespuestas();
        }
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Modal match
function abrirModalMatch(itemRespuesta) {
    respuestaSeleccionada = itemRespuesta;
    modalDatoTexto.textContent = `"${itemRespuesta.texto}"`;
    
    // Resetear compañero seleccionado
    compañeroSeleccionadoId = null;
    
    // Rellenar la cuadrícula de compañeros como botones táctiles
    selectorParticipantesContainer.innerHTML = "";
    Object.keys(todosLosParticipantes).forEach(id => {
        if (id !== idUsuarioActual) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn-participante-opcion";
            btn.textContent = todosLosParticipantes[id].nombre;
            
            btn.addEventListener("click", () => {
                // Deseleccionar anteriores
                const todosBtns = selectorParticipantesContainer.querySelectorAll(".btn-participante-opcion");
                todosBtns.forEach(b => b.classList.remove("seleccionado"));
                
                // Seleccionar actual
                btn.classList.add("seleccionado");
                compañeroSeleccionadoId = id;
            });
            
            selectorParticipantesContainer.appendChild(btn);
        }
    });
    
    modalMatch.classList.remove("oculta");
}

btnCerrarModal.addEventListener("click", () => {
    modalMatch.classList.add("oculta");
    respuestaSeleccionada = null;
});

// Enviar propuesta
btnEnviarPropuesta.addEventListener("click", () => {
    const objetivoId = compañeroSeleccionadoId;
    if (!objetivoId) {
        mostrarAlertaCustomizada("Selección Requerida", "Por favor, selecciona a un compañero de la lista antes de proponer el match.", "advertencia", "⚠️");
        return;
    }

    if (!respuestaSeleccionada) return;

    btnEnviarPropuesta.disabled = true;
    btnEnviarPropuesta.textContent = "Esperando confirmación...";
    
    // Indicamos que esta propuesta proviene de nuestro cliente
    propuestaEnviadaLocalmente = true;

    db.ref(`intentos_match/${idUsuarioActual}`).set({
        adivinador_id: idUsuarioActual,
        objetivo_id: objetivoId,
        respuesta_adivinada: respuestaSeleccionada.texto,
        pregunta_id: respuestaSeleccionada.preguntaId,
        confirmado_adivinador: true,
        confirmado_objetivo: false,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
        mostrarAlertaCustomizada(
            "✉️ Propuesta Enviada",
            `Le has propuesto un match a <strong>${todosLosParticipantes[objetivoId].nombre}</strong>.<br>¡Dile que revise su celular para aceptar o rechazar! 📱`,
            "info",
            "✉️"
        );
    }).catch(err => {
        mostrarAlertaCustomizada("Error", "No se pudo enviar la propuesta de match. Inténtalo de nuevo.", "advertencia", "⚠️");
        console.error(err);
        propuestaEnviadaLocalmente = false;
        btnEnviarPropuesta.disabled = false;
        btnEnviarPropuesta.textContent = "Proponer Match";
    });
});

// Escuchar propuestas hacia mí (Doble Confirmación)
function escucharMatchesPropuestosHaciaMi() {
    db.ref("intentos_match").on("value", (snapshot) => {
        const intentos = snapshot.val() || {};
        
        const miIntentoEntranteId = Object.keys(intentos).find(adivId => {
            return intentos[adivId].objetivo_id === idUsuarioActual && intentos[adivId].confirmado_objetivo === false;
        });

        if (miIntentoEntranteId) {
            const intento = intentos[miIntentoEntranteId];
            const nombreAdivinador = todosLosParticipantes[intento.adivinador_id]?.nombre || "Alguien";
            
            // Obtener el texto de la pregunta que fue respondida
            // Como las preguntas son dinámicas, las sacamos del objeto del usuario actual
            const textoPreguntaReal = usuarioActual.preguntas?.[intento.pregunta_id]?.texto || "una de tus preguntas";

            textoNotificacion.innerHTML = `<strong>${nombreAdivinador}</strong> dice que respondiste <strong>"${intento.respuesta_adivinada}"</strong> a: <em>"${textoPreguntaReal}"</em>. ¿Es correcto?`;
            
            btnConfirmarMatch.onclick = () => resolverPropuestaEntrante(miIntentoEntranteId, true);
            btnRechazarMatch.onclick = () => resolverPropuestaEntrante(miIntentoEntranteId, false);

            // Sonar notificación si estaba oculta
            if (notificacionMatch.classList.contains("oculta")) {
                reproducirSonidoNotificacion();
            }

            notificacionMatch.classList.remove("oculta");
        } else {
            notificacionMatch.classList.add("oculta");
        }
    });
}

// Resolver propuesta (Aceptar o Rechazar)
function resolverPropuestaEntrante(adivinadorId, aceptado) {
    notificacionMatch.classList.add("oculta");

    if (aceptado) {
        db.ref(`intentos_match/${adivinadorId}/confirmado_objetivo`).set(true);
    } else {
        // Obtenemos los detalles del intento para verificar si el receptor está rechazando un match correcto (sabotaje)
        db.ref(`intentos_match/${adivinadorId}`).once("value", (snapshot) => {
            const intento = snapshot.val();
            if (!intento) return;

            const miRespuestaReal = usuarioActual.preguntas?.[intento.pregunta_id]?.respuesta;
            const esSabotaje = miRespuestaReal === intento.respuesta_adivinada;

            if (esSabotaje) {
                // Penalizar al receptor (saboteador) con -1 punto
                db.ref(`participantes/${idUsuarioActual}/puntos`).once("value", (snapPuntos) => {
                    let pts = snapPuntos.val() || 0;
                    db.ref(`participantes/${idUsuarioActual}/puntos`).set(pts - 1);
                });

                // RECOMPENSAR AL ADIVINADOR con +2 puntos porque era un match correcto!
                db.ref(`participantes/${adivinadorId}/puntos`).once("value", (snapPuntosA) => {
                    let ptsA = snapPuntosA.val() || 0;
                    db.ref(`participantes/${adivinadorId}/puntos`).set(ptsA + 2);
                });

                // Registrar el match como confirmado en Firebase (es correcto!)
                const idRespuestaUnica = `${idUsuarioActual}_${intento.pregunta_id}`;
                db.ref(`participantes/${adivinadorId}/aciertos/${idRespuestaUnica}`).set(true);

                const nuevoMatchRef = db.ref("matches_confirmados").push();
                nuevoMatchRef.set({
                    adivinador_id: adivinadorId,
                    objetivo_id: idUsuarioActual,
                    pregunta_id: intento.pregunta_id,
                    es_correcto: true,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });

                reproducirSonidoSabotaje();
                mostrarAlertaCustomizada(
                    "🚨 ¡SABOTEADOR ATRAPADO!",
                    "Intentaste rechazar un match que <strong>SÍ era tuyo</strong>.<br>Se te ha restado <strong>1 punto</strong> por juego sucio y tu compañero recibió sus +2 puntos correspondientes. ¡Juega limpio! 🤫",
                    "sabotaje",
                    "🚨"
                );

                // Notificar al adivinador del sabotaje escribiendo en la propuesta
                db.ref(`intentos_match/${adivinadorId}`).update({
                    resultado_rechazo: "sabotaje",
                    saboteador_nombre: usuarioActual.nombre
                });
            } else {
                // Rechazo honesto: penalizar al adivinador con -1 punto por suposición errónea
                db.ref(`participantes/${adivinadorId}/puntos`).once("value", (snapPuntos) => {
                    let puntosAdivinador = snapPuntos.val() || 0;
                    puntosAdivinador -= 1;
                    db.ref(`participantes/${adivinadorId}/puntos`).set(puntosAdivinador);
                    
                    // Borrar el intento (el adivinador recibirá la notificación normal de rechazo)
                    db.ref(`intentos_match/${adivinadorId}`).remove();
                });
            }
        });
    }
}

// Escuchar respuesta a mi propuesta
function escucharResolucionDeMiPropuesta() {
    db.ref(`intentos_match/${idUsuarioActual}`).on("value", (snapshot) => {
        const propuesta = snapshot.val();
        
        if (!propuesta) {
            if (btnEnviarPropuesta.disabled) {
                btnEnviarPropuesta.disabled = false;
                btnEnviarPropuesta.textContent = "Proponer Match";
                modalMatch.classList.add("oculta");
                
                // Solo alertar si el oponente lo rechazó activamente física/lógicamente
                if (propuestaEnviadaLocalmente) {
                    reproducirSonidoFallo();
                    mostrarAlertaCustomizada(
                        "❌ MATCH RECHAZADO",
                        "Tu propuesta de match fue rechazada por tu compañero.<br>Restas <strong>-1 punto</strong> por suposición incorrecta. ¡Sigue intentando! 💪",
                        "advertencia",
                        "❌"
                    );
                }
                propuestaEnviadaLocalmente = false;
            }
            return;
        }

        // Si se detecta un resultado de rechazo por sabotaje
        if (propuesta.resultado_rechazo === "sabotaje") {
            btnEnviarPropuesta.disabled = false;
            btnEnviarPropuesta.textContent = "Proponer Match";
            modalMatch.classList.add("oculta");
            propuestaEnviadaLocalmente = false;

            reproducirSonidoSabotajeAdivinador();
            mostrarAlertaCustomizada(
                "🕵️ ¡ATRAPADO EN LA MENTIRA!",
                `Tu compañero <strong>${propuesta.saboteador_nombre}</strong> intentó rechazar tu match correcto, pero nuestro sistema lo detectó.<br>¡Sumas tus <strong>+2 puntos</strong> correspondientes!<br>Tu compañero ha sido penalizado con -1 punto. 🏆`,
                "exito",
                "🕵️"
            );

            // Limpiamos el intento de Firebase
            db.ref(`intentos_match/${idUsuarioActual}`).remove();
            return;
        }

        if (propuesta.confirmado_adivinador && propuesta.confirmado_objetivo) {
            const objetivoId = propuesta.objetivo_id;
            
            // Validar contra la respuesta dinámica real guardada en el objetivo
            const respuestaRealPropietario = todosLosParticipantes[objetivoId]?.preguntas?.[propuesta.pregunta_id]?.respuesta;

            const esCorrecto = respuestaRealPropietario === propuesta.respuesta_adivinada;
            
            procesarResultadoMatch(objetivoId, propuesta.pregunta_id, esCorrecto);
        }
    });
}

function procesarResultadoMatch(objetivoId, preguntaId, esCorrecto) {
    const idRespuestaUnica = `${objetivoId}_${preguntaId}`;

    db.ref(`participantes/${idUsuarioActual}/puntos`).once("value", (snapPuntos) => {
        let puntosActuales = snapPuntos.val() || 0;
        
        if (esCorrecto) {
            puntosActuales += 2;
            reproducirSonidoAcierto();
            
            db.ref(`participantes/${idUsuarioActual}/aciertos/${idRespuestaUnica}`).set(true);
            
            // Guardar match en Firebase
            const nuevoMatchRef = db.ref("matches_confirmados").push();
            nuevoMatchRef.set({
                adivinador_id: idUsuarioActual,
                objetivo_id: objetivoId,
                pregunta_id: preguntaId,
                es_correcto: true,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });

            mostrarAlertaCustomizada(
                "🎉 ¡MATCH CORRECTO!",
                `¡Excelente! Adivinaste correctamente la respuesta de tu compañero.<br>Sumas <strong>+2 puntos</strong>. 🏆`,
                "exito",
                "🎉"
            );
        } else {
            puntosActuales -= 1;
            reproducirSonidoFallo();
            mostrarAlertaCustomizada(
                "❌ MATCH INCORRECTO",
                `La respuesta seleccionada no correspondía a este compañero.<br>Restas <strong>-1 punto</strong>. ¡Vuelve a intentarlo! 🧐`,
                "advertencia",
                "❌"
            );
        }

        db.ref(`participantes/${idUsuarioActual}/puntos`).set(puntosActuales);

        // Apagamos el flag local para que al removerse la propuesta no tire la alerta de rechazo
        propuestaEnviadaLocalmente = false;
        db.ref(`intentos_match/${idUsuarioActual}`).remove().then(() => {
            btnEnviarPropuesta.disabled = false;
            btnEnviarPropuesta.textContent = "Proponer Match";
            modalMatch.classList.add("oculta");
            respuestaSeleccionada = null;
        });
    });
}

// ==========================================================================
// EFECTOS DE SONIDO DE 8-BITS CON WEB AUDIO API
// ==========================================================================
let audioCtx = null;

function obtenerAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
}

function reproducirSonidoAcierto() {
    try {
        const ctx = obtenerAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sine";
        // Nota alegre ascendente rápida de 8 bits
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(960, ctx.currentTime + 0.22);
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
    } catch(e) {
        console.warn("Audio Context bloqueado o no soportado: ", e);
    }
}

function reproducirSonidoFallo() {
    try {
        const ctx = obtenerAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sawtooth";
        // Sonido de fallo zumbante descendente
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.35);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
    } catch(e) {
        console.warn("Audio Context bloqueado o no soportado: ", e);
    }
}

function reproducirSonidoNotificacion() {
    try {
        const ctx = obtenerAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sine";
        // Sonido rápido de campana de 8 bits
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
    } catch(e) {
        console.warn("Audio Context bloqueado o no soportado: ", e);
    }
}

// Sonido gracioso de bocina/error repetitivo para cuando saboteas
function reproducirSonidoSabotaje() {
    try {
        const ctx = obtenerAudioContext();
        const osc1 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.type = "sawtooth";
        // Dos tonos alternados rápidos de alarma (sonido áspero)
        osc1.frequency.setValueAtTime(140, ctx.currentTime);
        osc1.frequency.setValueAtTime(280, ctx.currentTime + 0.12);
        osc1.frequency.setValueAtTime(140, ctx.currentTime + 0.24);
        osc1.frequency.setValueAtTime(280, ctx.currentTime + 0.36);
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.48);
        
        osc1.start();
        osc1.stop(ctx.currentTime + 0.48);
    } catch(e) {
        console.warn(e);
    }
}

// Sonido gracioso de victoria astuta (ta-da de trompeta) para el adivinador saboteado
function reproducirSonidoSabotajeAdivinador() {
    try {
        const ctx = obtenerAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "triangle";
        // Sonido de trompeta burlona ascendente
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
    } catch(e) {
        console.warn(e);
    }
}

// ==========================================================================
// SISTEMA DE ALERTAS PERSONALIZADAS EN EL DOM (EVITA BLOQUEOS NATIVOS)
// ==========================================================================
function mostrarAlertaCustomizada(titulo, mensaje, tipo = "info", icono = "ℹ️") {
    const elAlertaCustom = document.getElementById("alerta-custom");
    const elIcono = document.getElementById("alerta-custom-icono");
    const elTitulo = document.getElementById("alerta-custom-titulo");
    const elMensaje = document.getElementById("alerta-custom-mensaje");
    const elTarjeta = elAlertaCustom.querySelector(".alerta-custom-tarjeta");

    if (!elAlertaCustom) return;

    // Resetear clases
    elTarjeta.className = "modal-contenido alerta-custom-tarjeta";
    if (tipo === "sabotaje") elTarjeta.classList.add("sabotaje-col");
    else if (tipo === "exito") elTarjeta.classList.add("exito-col");
    else if (tipo === "advertencia") elTarjeta.classList.add("advertencia-col");

    elIcono.textContent = icono;
    elTitulo.textContent = titulo;
    elMensaje.innerHTML = mensaje;

    elAlertaCustom.classList.remove("oculta");
}

// Configurar cierre de alertas
document.getElementById("btn-alerta-custom-cerrar").addEventListener("click", () => {
    document.getElementById("alerta-custom").classList.add("oculta");
});
document.getElementById("btn-alerta-custom-cerrar-x").addEventListener("click", () => {
    document.getElementById("alerta-custom").classList.add("oculta");
});

// ==========================================================================
// FASE 7: GRAFO EN TIEMPO REAL CON D3.JS (TEMA CLARO Y MEJORAS DE COLOR)
// ==========================================================================

let simulacion = null;

function inicializarGrafoVisual(esFinal) {
    const idSvg = esFinal ? "#svg-grafo-final" : "#svg-grafo";
    const svg = d3.select(idSvg);
    if (svg.empty()) return;

    svg.selectAll("*").remove();

    const width = svg.node().getBoundingClientRect().width || 800;
    const height = svg.node().getBoundingClientRect().height || 600;

    // DEFINICIÓN DE FILTROS Y CONTENEDORES
    const defs = svg.append("defs");
    
    // Marcador de flechas general
    defs.append("marker")
        .attr("id", "arrow-match")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 26) // Fuera de la frontera de r=20
        .attr("refY", 0)
        .attr("markerWidth", 7)
        .attr("markerHeight", 7)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#10b981");

    // Contenedores del zoom
    const container = svg.append("g").attr("class", "container-zoom");
    const gLinks = container.append("g").attr("class", "enlaces");
    const gNodes = container.append("g").attr("class", "nodos");

    // SOPORTE DE ZOOM Y PAN
    const zoom = d3.zoom()
        .scaleExtent([0.5, 3])
        .on("zoom", (event) => {
            container.attr("transform", event.transform);
        });
    svg.call(zoom);

    // SIMULACIÓN FÍSICA
    simulacion = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).distance(130))
        .force("charge", d3.forceManyBody().strength(-240))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(40));

    let nodosGrafo = [];
    let enlacesGrafo = [];
    let rawParticipantes = {};
    let rawMatches = {};

    let prevNodosKeys = "";
    let prevEnlacesKeys = "";
    let nodosMap = new Map();
    let estructuraCambio = false;

    function procesarYActualizarGrafo() {
        // Reusar objetos de nodo para conservar x, y, vx, vy
        nodosGrafo = Object.keys(rawParticipantes).map((id, i) => {
            let node = nodosMap.get(id);
            if (!node) {
                node = {
                    id: id,
                    nombre: rawParticipantes[id].nombre,
                    preguntas: rawParticipantes[id].preguntas || {},
                    color: d3.schemeTableau10[i % 10]
                };
                nodosMap.set(id, node);
            } else {
                node.nombre = rawParticipantes[id].nombre;
                node.preguntas = rawParticipantes[id].preguntas || {};
            }
            return node;
        });

        // Limpiar nodos eliminados
        for (let id of nodosMap.keys()) {
            if (!rawParticipantes[id]) {
                nodosMap.delete(id);
            }
        }

        enlacesGrafo = Object.keys(rawMatches).map(id => ({
            id: id,
            source: rawMatches[id].adivinador_id,
            target: rawMatches[id].objetivo_id,
            correcto: rawMatches[id].es_correcto
        }));

        // Comprobar si cambió la estructura
        const currentNodosKeys = Object.keys(rawParticipantes).sort().join(",");
        const currentEnlacesKeys = Object.keys(rawMatches).sort().join(",");

        estructuraCambio = (currentNodosKeys !== prevNodosKeys) || (currentEnlacesKeys !== prevEnlacesKeys);

        prevNodosKeys = currentNodosKeys;
        prevEnlacesKeys = currentEnlacesKeys;

        actualizarGrafo();
    }

    db.ref("participantes").on("value", (snapPart) => {
        rawParticipantes = snapPart.val() || {};
        procesarYActualizarGrafo();
    });

    db.ref("matches_confirmados").on("value", (snapMatches) => {
        rawMatches = snapMatches.val() || {};
        procesarYActualizarGrafo();
    });

    function actualizarGrafo() {
        const maxPuntos = d3.max(nodosGrafo, d => todosLosParticipantes[d.id]?.puntos || 0);

        if (estructuraCambio) {
            // 1. ENLACES (Líneas direccionales con color personalizado del adivinador)
            let link = gLinks.selectAll(".enlace-linea")
                .data(enlacesGrafo, d => d.id);

            link.exit().remove();

            const linkEnter = link.enter().append("line")
                .attr("class", d => `enlace-linea ${d.correcto ? 'correcto' : ''} animada`)
                .attr("stroke-width", 2.5)
                .attr("marker-end", "url(#arrow-match)");

            link = linkEnter.merge(link)
                .attr("stroke", d => {
                    const sourceId = typeof d.source === "object" ? d.source.id : d.source;
                    const sourceNode = nodosGrafo.find(n => n.id === sourceId);
                    return sourceNode ? sourceNode.color : "#10b981";
                });

            // 2. NODOS
            let node = gNodes.selectAll(".nodo-grupo")
                .data(nodosGrafo, d => d.id);

            node.exit().remove();

            const nodeEnter = node.enter().append("g")
                .attr("class", "nodo-grupo")
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            // Anillo de brillo giratorio dorado para los líderes
            nodeEnter.append("circle")
                .attr("class", "nodo-brillo-lider")
                .attr("r", 25)
                .attr("fill", "none")
                .attr("stroke", "#fbbf24")
                .attr("stroke-width", 0);

            // Círculo principal del nodo usando su propiedad de color guardada
            nodeEnter.append("circle")
                .attr("class", "nodo-circulo")
                .attr("r", 20)
                .attr("fill", d => d.color);

            // Nombre del jugador
            nodeEnter.append("text")
                .attr("class", "nodo-texto")
                .attr("y", 32)
                .text(d => d.nombre);

            node = nodeEnter.merge(node);

            // Hover final para mostrar datos
            if (esFinal) {
                const tooltip = document.getElementById("revelador-datos");
                const revNombre = document.getElementById("rev-nombre");
                const cajaRespuestas = document.getElementById("caja-respuestas-reveladas");

                node.selectAll(".nodo-circulo")
                    .on("mouseover", (event, d) => {
                        if (tooltip) tooltip.classList.add("activa");
                        if (revNombre) revNombre.textContent = d.nombre;
                        
                        if (cajaRespuestas) {
                            cajaRespuestas.innerHTML = "";
                            const preg = d.preguntas || {};
                            Object.keys(preg).forEach(key => {
                                const item = preg[key];
                                if (item) {
                                    const div = document.createElement("div");
                                    div.className = "item-revelado";
                                    div.innerHTML = `
                                        <p><strong>P:</strong> ${item.texto}</p>
                                        <p><strong>R:</strong> <em>"${item.respuesta}"</em></p>
                                    `;
                                    cajaRespuestas.appendChild(div);
                                }
                            });
                        }
                    })
                    .on("mouseout", () => {
                        if (tooltip) tooltip.classList.remove("activa");
                    });
            }

            simulacion.nodes(nodosGrafo);
            simulacion.force("link").links(enlacesGrafo);
            simulacion.alpha(0.3).restart();

            simulacion.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node
                    .attr("transform", d => {
                        const r = 20;
                        d.x = Math.max(r, Math.min(width - r, d.x));
                        d.y = Math.max(r, Math.min(height - r, d.y));
                        return `translate(${d.x}, ${d.y})`;
                    });

                // BAMBOLEO DE FLOTACIÓN ORGÁNICA (Vibración suave)
                nodosGrafo.forEach(d => {
                    d.vx += (Math.random() - 0.5) * 0.05;
                    d.vy += (Math.random() - 0.5) * 0.05;
                });
            });
        }

        // Si la estructura no cambió, actualizamos los halos y textos de forma reactiva
        const nodeSelection = gNodes.selectAll(".nodo-grupo");

        nodeSelection.select(".nodo-brillo-lider")
            .attr("stroke-width", d => {
                const puntosNode = todosLosParticipantes[d.id]?.puntos || 0;
                return (maxPuntos > 0 && puntosNode === maxPuntos) ? 2.5 : 0;
            });

        nodeSelection.select(".nodo-texto")
            .text(d => d.nombre);
    }

    // Funciones drag & drop
    function dragstarted(event, d) {
        if (!event.active) simulacion.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulacion.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

// FASE 8: EFECTO DE CONFETI ANIMADO EN JS PURO
function lanzarConfeti() {
    const viejo = document.getElementById("canvas-confeti");
    if (viejo) viejo.remove();

    const canvasConfeti = document.createElement("canvas");
    canvasConfeti.id = "canvas-confeti";
    canvasConfeti.style.position = "fixed";
    canvasConfeti.style.top = "0";
    canvasConfeti.style.left = "0";
    canvasConfeti.style.width = "100vw";
    canvasConfeti.style.height = "100vh";
    canvasConfeti.style.pointerEvents = "none";
    canvasConfeti.style.zIndex = "99";
    document.body.appendChild(canvasConfeti);

    const ctx = canvasConfeti.getContext("2d");
    let width = canvasConfeti.width = window.innerWidth;
    let height = canvasConfeti.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvasConfeti.width = window.innerWidth;
        height = canvasConfeti.height = window.innerHeight;
    });

    const colores = ["#4f46e5", "#10b981", "#ef4444", "#fbbf24", "#06b6d4", "#ec4899"];
    const particulas = [];

    for (let i = 0; i < 150; i++) {
        particulas.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            r: Math.random() * 6 + 4,
            d: Math.random() * height,
            color: colores[Math.floor(Math.random() * colores.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.02,
            tiltAngle: 0
        });
    }

    function dibujar() {
        ctx.clearRect(0, 0, width, height);

        let finalizado = true;
        particulas.forEach((p) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle);
            p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 15;

            if (p.y < height) {
                finalizado = false;
            }

            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
        });

        if (!finalizado) {
            requestAnimationFrame(dibujar);
        } else {
            canvasConfeti.remove();
        }
    }

    dibujar();
}

// --- SISTEMA DE CARRUSEL AUTOMÁTICO DE REVELACIÓN (Fase 2) ---
let intervaloCarrusel = null;
let carruselIndice = 0;

function iniciarCarruselAutomatico() {
    if (intervaloCarrusel) clearInterval(intervaloCarrusel);
    carruselIndice = 0;

    // Obtener los datos de los participantes registrados
    db.ref("participantes").once("value", (snapshot) => {
        const participantes = snapshot.val() || {};
        const listaIds = Object.keys(participantes);
        if (listaIds.length === 0) return;

        function mostrarSiguiente() {
            const idActual = listaIds[carruselIndice];
            const jugador = participantes[idActual];
            if (!jugador) return;

            const carNombre = document.getElementById("carrusel-nombre");
            const carCaja = document.getElementById("carrusel-respuestas-caja");
            const tarjeta = document.getElementById("revelacion-carrusel-tarjeta");

            if (!carNombre || !carCaja || !tarjeta) return;

            // Reiniciar animación CSS de desvanecido/desplazamiento
            tarjeta.style.animation = "none";
            tarjeta.offsetHeight; // Truco de reflow para reiniciar la animación
            tarjeta.style.animation = null;

            // Inyectar datos en la tarjeta
            carNombre.textContent = jugador.nombre;
            carCaja.innerHTML = "";

            const preg = jugador.preguntas || {};
            Object.keys(preg).forEach(key => {
                const item = preg[key];
                if (item) {
                    const div = document.createElement("div");
                    div.className = "item-revelado";
                    div.innerHTML = `
                        <p><strong>P:</strong> ${item.texto}</p>
                        <p><strong>R:</strong> <em>"${item.respuesta}"</em></p>
                    `;
                    carCaja.appendChild(div);
                }
            });

            // RESALTAR EL NODO EN EL GRAFO D3.JS
            // 1. Restablecer el tamaño y borde de todos los nodos en el SVG
            d3.selectAll("#svg-grafo-final .nodo-circulo")
                .transition()
                .duration(600)
                .attr("r", 20)
                .attr("stroke", "#ffffff")
                .attr("stroke-width", 2);

            // 2. Hacer crecer y brillar el círculo del participante que se está revelando
            d3.selectAll("#svg-grafo-final .nodo-grupo")
                .filter(d => d.id === idActual)
                .select(".nodo-circulo")
                .transition()
                .duration(600)
                .attr("r", 30) // Crece de tamaño
                .attr("stroke", "#ef4444") // Borde rojo vibrante
                .attr("stroke-width", 4.5);

            // Avanzar al siguiente participante
            carruselIndice = (carruselIndice + 1) % listaIds.length;
        }

        // Mostrar el primero de inmediato
        mostrarSiguiente();

        // Rotar cada 6 segundos
        intervaloCarrusel = setInterval(mostrarSiguiente, 6000);
    });
}

// Función global para reiniciar el juego y vaciar la base de datos
function reiniciarTodoElJuego() {
    if (confirm("⚠️ ¿Estás absolutamente seguro de que deseas REINICIAR TODO? Esto eliminará todos los participantes registrados, puntuaciones y conexiones de red. ¡Volverás al lobby de inicio!")) {
        pararCronometroLocal();
        if (intervaloCarrusel) clearInterval(intervaloCarrusel);

        // Limpiar la base de datos por completo y restablecer el estado del juego
        db.ref().set({
            estado_juego: {
                iniciado: false,
                finalizado: false,
                timestamp_inicio: 0
            },
            preguntas_configuradas: {
                p1: "¿Qué es lo que más te apasiona en la vida?",
                p2: "¿Cuál es el libro o película que más te ha marcado?",
                p3: "¿Si pudieras viajar a cualquier parte del mundo hoy, a dónde irías?"
            }
        }).then(() => {
            alert("¡La base de datos se ha restablecido! Todos los celulares se han redirigido al registro.");
            window.location.reload();
        }).catch(err => {
            console.error("Error al reiniciar la base de datos: ", err);
            alert("No se pudo reiniciar la base de datos.");
        });
    }
}

// Iniciar aplicación al cargar
window.onload = inicializarRutaYVistas;
