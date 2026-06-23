import { obtenerArregloNoticias } from './firebase.js';
import {
    plantillaLiteralNoticiaSteam,
    plantillaLiteralNoticiaNintendo,
    plantillaLiteralNoticiaXbox,
    plantillaLiteralNoticiaDestacadaAnchoCompleto,
    plantillaLiteralNoticiaPS
} from './plantillasNoticias.js';

// En todas las secciones se hace lo mismo, obtener noticias, filtrar por categoría, obtener el contenedor,
// generar HTML e insertarlo en el DOM. Modularizamos ese comportamiento
const renderSeccion = (containerId, noticias, plantilla) => {
    const container = document.getElementById(containerId);
    if (!container) return; // No afecte la ejecución
    container.innerHTML = noticias.map(noticia => plantilla(noticia)).join('');
};

// Esta funcion no elimina el contenido qeu ya existe, simplemente agrega al final
const renderSeccionAppend = (containerId, noticias, plantilla) => {
    const container = document.getElementById(containerId);
    if (!container) return; // No afecte la ejecución
    container.innerHTML += noticias.map(noticia => plantilla(noticia)).join('');
};


let mostrarNoticiasSteam = (noticias) => {
    if (noticias.length === 0) return;
    renderSeccion("container_noticias_steam", noticias, plantillaLiteralNoticiaSteam);
}

let mostrarNoticiasNintendo = (noticias) => {
    if (noticias.length === 0) return;
    renderSeccion("container_noticias_nintendo", noticias, plantillaLiteralNoticiaNintendo);
}

let mostrarNoticiasXbox = (noticias) => {
    if (noticias.length === 0) return;
    renderSeccion("container_noticias_xbox", noticias, plantillaLiteralNoticiaXbox);
};

let mostrarNoticiasPlaystation = async (noticias) => {

        let container_noticias_ps = document.getElementById("container_noticias_ps");
        container_noticias_ps.innerHTML = "";

        if (!container_noticias_ps ||noticias.length === 0) return;

        const [destacada, ...resto] = noticias;

        let containerHTML = plantillaLiteralNoticiaDestacadaAnchoCompleto(destacada);
        container_noticias_ps.innerHTML = containerHTML;

        renderSeccionAppend("container_noticias_ps", resto, plantillaLiteralNoticiaPS);

};

const initNoticias = async () => {
    try {
        const todasLasNoticias = await obtenerArregloNoticias();

        mostrarNoticiasSteam(todasLasNoticias.filter(n => n.categoria === "Steam"));
        mostrarNoticiasNintendo(todasLasNoticias.filter(n => n.categoria === "Nintendo"));
        mostrarNoticiasXbox(todasLasNoticias.filter(n => n.categoria === "Xbox"));
        mostrarNoticiasPlaystation(todasLasNoticias.filter(n => n.categoria === "PlayStation"));

    } catch (error) {
        console.log(error);
    }
};

export {initNoticias}