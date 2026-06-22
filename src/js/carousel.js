import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { obtenerArregloNoticiasCarousel } from './firebase.js';

// Importa las imgs para el carousel
const imagenesCarousel = import.meta.glob('/src/img/carousel/*.{jpg,png,jpeg,webp}', {
    eager: true,
    import: 'default'
});
// Convierte el objeto en un array ordenado por la ruta (car1, car2, car3...)
const rutasOrdenadas = Object.keys(imagenesCarousel).sort();
const arregloImagenes = rutasOrdenadas.map(ruta => imagenesCarousel[ruta]);

const plantillaSlideNoticia = (noticia, index) => {
    const srcImagen = arregloImagenes[index] || '';

    return `
        <li class="splide__slide">
        <div class="relative h-full w-full overflow-hidden">
            <img src="${srcImagen}" alt="${noticia.titulo}" class="absolute inset-0 w-full h-full object-cover">
            
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            
            <div class="absolute bottom-0 left-0 w-full p-6 sm:p-8">
            <span class="text-gray-300 text-sm mb-2 inline-block">
                <span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>${noticia.categoria}
            </span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                ${noticia.titulo}
            </h2>
            <p class="text-gray-200 text-sm mb-2 hidden sm:block">
                ${noticia.descripcion}
            </p>
            <span class="text-gray-400 text-xs">${noticia.fecha}</span>
            </div>
        </div>
        </li>
    `;
};

const cargaCarouselNoticias = async () => {
    const container = document.getElementById("lista_carousel");
    const noticias = await obtenerArregloNoticiasCarousel();

    if (!noticias || noticias.length === 0) return;

    // map con index para emparejar por posición con arregloImagenes
    container.innerHTML = noticias.map((noticia, index) => plantillaSlideNoticia(noticia, index)).join('');
};

const initCarousel = async () => {
    await cargaCarouselNoticias();

    const splide = new Splide( '.splide', {
    type    : 'loop',
    perPage : 1,
    autoplay: true,
    interval: 5000, // Time in milliseconds (e.g., 5 seconds) before moving to the next slide
    speed   : 400,  // Time in milliseconds (e.g., 0.4 seconds) for the transition animation itself
    } );

    let bar = null;

    splide.on('mounted', function () {
        bar = splide.root.querySelector('.my-slider-progress-bar');
    });

    // Updates the bar width whenever the carousel moves:
    splide.on('mounted move', function () {
        if (!bar) return;

        var end  = splide.Components.Controller.getEnd() + 1;
        var rate = Math.min( ( splide.index + 1 ) / end, 1 );
        bar.style.width = String( 100 * rate ) + '%';
    });

    splide.mount();
};

initCarousel();

