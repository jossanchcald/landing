import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";


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

let plantillaLiteralNoticias = (noticia) => {
    return `
        <div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
            <div class="flex flex-row sm:block hover-img">

                <a href="#">
                    <img
                        class="max-w-full w-full mx-auto"
                        src="src/img/noticias/${noticia.imagen}"
                        alt="${noticia.titulo}">
                </a>

                <div class="py-0 sm:py-3 pl-3 sm:pl-0">

                    <h3 class="text-lg font-bold leading-tight mb-2">
                        <a href="#">
                            ${noticia.titulo}
                        </a>
                    </h3>

                    <p class="hidden md:block text-gray-600 leading-tight mb-1">
                        ${noticia.descripcion}
                    </p>

                    <span class="text-gray-500">
                        <span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
                        ${noticia.fecha}
                    </span>

                </div>

            </div>
        </div>`;
};

let plantillaLiteralNoticiaBgWhite = (noticia) => {

    return `
        <div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">

            <div class="bg-white flex flex-row sm:block hover-img">

                <a href="#">
                    <img
                        class="max-w-full w-full mx-auto"
                        src="src/img/noticias/${noticia.imagen}"
                        alt="${noticia.titulo}">
                </a>

                <div class="py-3 px-6">

                    <h3 class="text-lg font-bold leading-tight mb-2">
                        <a href="#">
                            ${noticia.titulo}
                        </a>
                    </h3>

                    <p class="hidden md:block text-gray-600 leading-tight mb-1">
                        ${noticia.descripcion}
                    </p>

                    <span class="text-gray-500">
                        <span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>
                        ${noticia.fecha}
                    </span>

                </div>

            </div>

        </div>`;
}

(() => {
    mostrarNoticiasSteam();
    mostrarNoticiasNintendo();
})();

export {obtenerArregloNoticiasCarousel}