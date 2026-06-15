"use strict";

import { fetchProducts, fetchCategories } from "./functions";

/**
 * Muestra un elemento toast (notificación) en la interfaz añadiendo la clase 'md:block'.
 * Busca el elemento con id 'toast-interactive' y lo hace visible.
 * Si el elemento no existe, la función no hace nada.
 *
 * @function showToast
 * @returns {void}
 */
const showToast = () => {
    const toast = document.getElementById('toast-interactive');

    if (toast) {
        toast.classList.add('md:block');
    }
};

/**
 * Configura un evento de clic en el elemento de demostración que abre un video en YouTube.
 * Busca el elemento con id 'demo' y le agrega un listener para abrir un video en una nueva pestaña.
 * Si el elemento no existe, la función no hace nada.
 *
 * @function showVideo
 * @returns {void}
 */
const showVideo = () => {
    const demo = document.getElementById('demo');

    if (demo) {
        demo.addEventListener('click', () => {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        });
    }
};

/**
 * Obtiene y renderiza los primeros 6 productos en el contenedor 'products-container'.
 * Realiza una solicitud para obtener el listado de productos, los procesa y genera
 * el HTML correspondiente con información de precio, imagen y enlace a Amazon.
 * Los títulos se truncan a 20 caracteres si es necesario.
 *
 * @function renderProducts
 * @returns {void}
 */
const renderProducts = () => {
    fetchProducts("https://data-dawm.github.io/datum/reseller/products.json")
        .then(result => {
            if (result.success) {
                let container = document.getElementById("products-container");
                container.innerHTML = ``;

                let products = result.body.slice(0, 6);
                products.forEach(product => {

                    let productHTML = `
                    <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                        <img
                            class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
                            src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
                        <h3
                            class="h-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-black-600 dark:hover:text-white-400">
                            $[PRODUCT.PRICE]
                        </h3>

                        <div class="h-5 rounded w-full">[PRODUCT.TITLE]</div>
                            <div class="space-y-2">
                                <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
                                    Ver en Amazon
                                </a>
                                <div class="hidden"><span class="1">[PRODUCT.CATEGORY_ID]</span></div>
                            </div>
                        </div>
                    </div>`;
                    productHTML = productHTML.replaceAll("[PRODUCT.TITLE]", product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title);
                    productHTML = productHTML.replaceAll("[PRODUCT.IMGURL]", product.imgUrl);
                    productHTML = productHTML.replaceAll("[PRODUCT.PRICE]", product.price);
                    productHTML = productHTML.replaceAll("[PRODUCT.PRODUCTURL]", product.productURL);
                    productHTML = productHTML.replaceAll("[PRODUCT.CATEGORY_ID]", product.category_id);
                    container.innerHTML += productHTML;
                });

            } else {

            }
        });
}

/**
 * Obtiene y renderiza las categorías disponibles en un elemento select.
 * Realiza una solicitud para obtener el listado de categorías en XML, las procesa
 * y genera opciones HTML en el dropdown con id 'categories'.
 * Muestra un mensaje de error en una alerta si algo falla.
 *
 * @async
 * @function renderCategories
 * @returns {Promise<void>}
 */
let renderCategories = async () => {

    try {
        const result = await fetchCategories('https://data-dawm.github.io/datum/reseller/categories.xml');

        if (result.success) {
            let container = document.getElementById("categories");
            container.innerHTML = `<option selected disabled>Seleccione una categoría</option>`;

            let categoriesXML = result.body;
            let categories = categoriesXML.getElementsByTagName("category");

            for (let category of categories) {

                let categoryHTML = `<option value="[ID]">[NAME]</option>`;

                const id = category.getElementsByTagName("id")[0].textContent;
                const name = category.getElementsByTagName("name")[0].textContent;

                categoryHTML = categoryHTML.replaceAll('[ID]', id);
                categoryHTML = categoryHTML.replaceAll('[NAME]', name);

                container.innerHTML += categoryHTML;
            }

        } else {
            throw new Error(result.body);
        }

    } catch (error) {
        alert(error.message);
    }
}

(() => {
    showToast();
    showVideo();
    renderProducts();
    renderCategories();
})();