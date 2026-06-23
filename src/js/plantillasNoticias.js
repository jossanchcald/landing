
let plantillaLiteralNoticiaSteam = (noticia) => {
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

let plantillaLiteralNoticiaNintendo = (noticia) => {

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

let plantillaLiteralNoticiaDestacadaAnchoCompleto = (noticia) => {
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

export {plantillaLiteralNoticiaNintendo, plantillaLiteralNoticiaPS, plantillaLiteralNoticiaDestacadaAnchoCompleto, plantillaLiteralNoticiaXbox, plantillaLiteralNoticiaSteam}