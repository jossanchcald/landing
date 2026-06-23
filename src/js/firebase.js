import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";
import { mostrarSeccionSegunSuscripcion } from './localStorage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://landing-4f0eb-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let obtenerArregloNoticias = async () => {
    try {
        const snapshot = await get(
            ref(database, "noticias")
        );

        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            throw new Error("No encuentra base de datos noticias");
        }
    } catch (error) {
        console.log(error);
    }
}

let obtenerArregloNoticiasCarousel = async () => {
    try {
        const snapshot = await get(
            ref(database, "carousel")
        );

        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            throw new Error("No se ncuentra base de datos carousel");
        }
    } catch (error) {
        console.log(error);
    }
}

let mostrarNoticiasSteam = async () => {
    try {
        let noticias = await obtenerArregloNoticias();
        noticias = noticias.filter(noticia => noticia.categoria === "Steam");

        let container_noticias_steam = document.getElementById("container_noticias_steam");
        container_noticias_steam.innerText = ``;

        let containerHTML = "";
        for (const noticia of noticias) {
            let productHTML = plantillaLiteralNoticias(noticia);
            containerHTML += productHTML;
        }
        container_noticias_steam.innerHTML = containerHTML;

    } catch (error) {
        console.log(error)
    }
}

let mostrarNoticiasNintendo = async () => {
    try {
        let noticias = await obtenerArregloNoticias();
        noticias = noticias.filter(noticia => noticia.categoria === "Nintendo");

        let container_noticias_nintendo = document.getElementById("container_noticias_nintendo");
        container_noticias_nintendo.innerText = ``;

        let containerHTML = "";
        for (const noticia of noticias) {
            let productHTML = plantillaLiteralNoticiaBgWhite(noticia);
            containerHTML += productHTML;
        }

        container_noticias_nintendo.innerHTML = containerHTML;

    } catch (error) {
        console.log(error)
    }
};

let mostrarNoticiasXbox = async () => {
    try {
        let noticias = await obtenerArregloNoticias();
        noticias = noticias.filter(noticia => noticia.categoria === "Xbox");

        let container_noticias_xbox = document.getElementById("container_noticias_xbox");
        container_noticias_xbox.innerText = ``;

        let containerHTML = "";
        for (const noticia of noticias) {
            containerHTML += plantillaLiteralNoticiaXbox(noticia);
        }
        container_noticias_xbox.innerHTML = containerHTML;

    } catch (error) {
        console.log(error);
    }
};

let mostrarNoticiasPlaystation = async () => {
    try {
        let noticias = await obtenerArregloNoticias();
        noticias = noticias.filter(noticia => noticia.categoria === "PlayStation");

        let container_noticias_ps = document.getElementById("container_noticias_ps");
        container_noticias_ps.innerHTML = "";

        if (noticias.length === 0) return;

        const [destacada, ...resto] = noticias;

        let containerHTML = plantillaLiteralNoticiaDestacadaPS(destacada);

        for (const noticia of resto) {
            containerHTML += plantillaLiteralNoticiaPS(noticia);
        }

        container_noticias_ps.innerHTML = containerHTML;

    } catch (error) {
        console.log(error);
    }
};

let plantillaLiteralNoticias = (noticia) => {
    return `
        <div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
            <div class="flex flex-row sm:block hover-img">

                <a>
                    <img
                        class="rounded-md max-w-full w-full mx-auto"
                        src="src/img/noticias/${noticia.imagen}"
                        alt="${noticia.titulo}">
                </a>

                <div class="py-0 sm:py-3 pl-3 sm:pl-0">

                    <h3 class="text-lg font-bold leading-tight mb-2">
                        <a>
                            ${noticia.titulo}
                        </a>
                    </h3>

                    <p class="hidden md:block text-gray-600 leading-tight mb-1">
                        ${noticia.descripcion}
                    </p>

                    <span class="text-gray-500">
                        <span class="inline-block h-3 border-l-4 border-l-[#1B2838] mr-2"></span>
                        ${noticia.fecha}
                    </span>

                </div>

            </div>
        </div>`;
};

let plantillaLiteralNoticiaBgWhite = (noticia) => {

    return `
        <div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">

            <div class="rounded-md bg-white flex flex-row sm:block hover-img">

                <a>
                    <img
                        class="rounded-md max-w-full w-full mx-auto"
                        src="/src/img/noticias/${noticia.imagen}"
                        alt="${noticia.titulo}">
                </a>

                <div class="py-3 px-6">

                    <h3 class="text-lg font-bold leading-tight mb-2">
                        <a>
                            ${noticia.titulo}
                        </a>
                    </h3>

                    <p class="hidden md:block text-gray-600 leading-tight mb-1">
                        ${noticia.descripcion}
                    </p>

                    <span class="text-gray-500">
                        <span class="inline-block h-3 border-l-4 border-l-[#E60012] mr-2"></span>
                        ${noticia.fecha}
                    </span>

                </div>

            </div>

        </div>`;
}

let plantillaLiteralNoticiaXbox = (noticia) => {
    return `
        <div class="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/4 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
            <div class="flex flex-row sm:block hover-img">
                <a>
                    <img class="rounded-md max-w-full w-full mx-auto" src="/src/img/noticias/${noticia.imagen}" alt="${noticia.titulo}">
                </a>
                <div class="py-0 sm:py-3 pl-3 sm:pl-0">
                    <h3 class="text-lg font-bold leading-tight mb-2">
                        <a>${noticia.titulo}</a>
                    </h3>
                    <p class="hidden md:block text-gray-600 leading-tight mb-1">
                        ${noticia.descripcion}
                    </p>
                    <span class="text-gray-500">
                        <span class="inline-block h-3 border-l-4 border-l-[#107C10] mr-2"></span>
                        ${noticia.fecha}
                    </span>
                </div>
            </div>
        </div>`;
};

// Plantilla para la noticia destacada (grande, con imagen de fondo)
let plantillaLiteralNoticiaDestacadaPS = (noticia) => {
    return `
        <div class="flex-shrink max-w-full w-full px-3 pb-5">
            <div class="relative hover-img max-h-98 overflow-hidden">
                <a>
                    <img class="rounded-md max-w-full w-full mx-auto h-auto" src="src/img/noticias/${noticia.imagen}" alt="${noticia.titulo}">
                </a>
                <div class="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
                    <a>
                        <h2 class="text-3xl font-bold capitalize text-white mb-3">${noticia.titulo}</h2>
                    </a>
                    <p class="text-gray-100 hidden sm:inline-block">${noticia.descripcion}</p>
                    <div class="pt-2">
                        <div class="text-gray-100">
                            <div class="inline-block h-3 border-l-4 border-l-[#003791] mr-2"></div>${noticia.fecha}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
};

// Plantilla para las noticias pequeñas
let plantillaLiteralNoticiaPS = (noticia) => {
    return `
        <div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
            <div class="flex flex-row sm:block hover-img">
                <a>
                    <img class="rounded-md max-w-full w-full mx-auto" src="src/img/noticias/${noticia.imagen}" alt="${noticia.titulo}">
                </a>
                <div class="py-0 sm:py-3 pl-3 sm:pl-0">
                    <h3 class="text-lg font-bold leading-tight mb-2">
                        <a>${noticia.titulo}</a>
                    </h3>
                    <p class="hidden md:block text-gray-600 leading-tight mb-1">
                        ${noticia.descripcion}
                    </p>
                    <span class="text-gray-500">
                        <span class="inline-block h-3 border-l-4 border-l-[#003791] mr-2"></span>
                        ${noticia.fecha}
                    </span>
                </div>
            </div>
        </div>`;
};

let registrarUsuario = () => {
    const formulario = document.getElementById("newsletter_form");

    formulario.addEventListener(
        "submit",
        registrarSuscriptor
    );
}

async function registrarSuscriptor(evento) {
    evento.preventDefault();

    const datos = new FormData(evento.target);

    const usuario = datos.get("usuario");
    const email = datos.get("email");
    const intereses = datos.getAll("intereses[]");

    if (intereses.length === 0) {
        alert("Seleccione al menos un interés");
        return;
    }

    const suscriptor = {
        usuario,
        email,
        intereses
    };
    try {

        await push(
            ref(database, "suscriptores"),
            suscriptor
        );

        alert("Suscripción realizada correctamente");

        localStorage.setItem('suscripcion', JSON.stringify({ usuario, email, intereses }));
        mostrarSeccionSegunSuscripcion();
        evento.target.reset();
    } catch (error) {

        console.error(error);
        alert("No se pudo realizar la suscripcion :(");

    }
}

(() => {
    mostrarNoticiasSteam();
    mostrarNoticiasNintendo();
    mostrarNoticiasXbox();
    mostrarNoticiasPlaystation();
    registrarUsuario();
})();

export { obtenerArregloNoticiasCarousel }