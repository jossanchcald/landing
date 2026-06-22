"use strict";

import { fetchProducts, fetchCategories } from "./functions.js";
import { saveVote, getVotes } from "./firebase.js";

/**
 * Muestra el mensaje toast interactivo eliminando la clase `hidden`
 * y agregando la clase `md:block` al elemento con id `toast-interactive`.
 *
 * @returns {void}
 */
const showToast = () => {
  const toast = document.getElementById('toast-interactive');

  if (toast) {
    toast.classList.add('md:block');
    toast.classList.remove('hidden');
  }
};

/**
 * Configura el evento click sobre el elemento con id `demo`.
 * Al hacer clic, abre un video de YouTube en una nueva pestaña.
 *
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
 * Obtiene la lista de productos desde un archivo JSON,
 * genera dinámicamente el HTML de cada producto y lo inserta
 * en el contenedor con id `products-container`.
 *
 * @returns {void}
 */
let renderProducts = () => {

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
                    </div>`;
          productHTML = productHTML.replaceAll("[PRODUCT.TITLE]", product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title);
          productHTML = productHTML.replaceAll('[PRODUCT.CATEGORY_ID]', product.category_id);
          productHTML = productHTML.replaceAll('[PRODUCT.IMGURL]', product.imgUrl);
          productHTML = productHTML.replaceAll('[PRODUCT.PRICE]', product.price);
          productHTML = productHTML.replaceAll('[PRODUCT.PRODUCTURL]', product.productURL);

          container.innerHTML += productHTML;
        });

      } else {
        alert(result.body);
      }
    });
}

/**
 * Obtiene las categorías desde un archivo XML,
 * procesa cada categoría y genera las opciones
 * de un elemento `<select>` con id `categories`.
 *
 * @async
 * @returns {Promise<void>} Promesa que se resuelve cuando las categorías han sido cargadas y renderizadas.
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

const enableForm = () => {
  const formVoto = document.getElementById("form_voting");

  if (formVoto) {
    formVoto.addEventListener('submit', (event) => {
      event.preventDefault();

      const selectedProd = document.getElementById("select_product").value;

      if (selectedProd) {
        saveVote(selectedProd).then(result => {
          alert(result.message);
        });
      }
    });
  }

}

const displayVotes = async () => {
  
  try {
    let responseVotos = await getVotes();

    if (responseVotos.status) {
      
      const votes = responseVotos.data;

      let containerResultados = document.getElementById("results");

      if (containerResultados) {
        let inicioTablaHTML = `
            <table class="min-w-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg">
                <thead>
                    <tr class="bg-gray-100 dark:bg-neutral-700 text-left text-sm font-semibold text-gray-700 dark:text-neutral-200">
                        <th class="px-4 py-2 border-b border-gray-200 dark:border-neutral-600">Producto</th>
                        <th class="px-4 py-2 border-b border-gray-200 dark:border-neutral-600 text-center">Total de Votos</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700 text-sm text-gray-600 dark:text-neutral-300">
        `;

        let mapaVotosProducto = new Map();

        Object.values(votes).forEach((voteData) => {
          let producto = voteData.productID;

          if (mapaVotosProducto.has(producto)) {
            let nVotos = mapaVotosProducto.get(producto)+1;
            mapaVotosProducto.set(producto, nVotos);
          } else {
            mapaVotosProducto.set(producto, 1);
          }
          
        });

        mapaVotosProducto.forEach((totalVotos, producto) => {
          inicioTablaHTML += `
            <tr class="hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                <td class="px-4 py-2 font-medium">${producto}</td>
                <td class="px-4 py-2 text-center font-semibold text-blue-600 dark:text-blue-400">${totalVotos}</td>
            </tr>
          `;
        });

        inicioTablaHTML += `
            </tbody>
          </table>
        `;

        containerResultados.innerHTML = inicioTablaHTML;
      }
    } else {
      resultsContainer.innerHTML = `
            <p class="text-gray-500 dark:text-neutral-400 text-sm italic py-4">
                ${response.message}
            </p>
        `;
      throw new Error(result.body);
    }
  } catch (error) {
    
  }
  
}

/**
 * Función autoejecutable que inicializa la aplicación.
 * Muestra el toast, configura el evento para el video
 * y carga los productos y categorías.
 *
 * @returns {void}
 */
(() => {
  showToast();
  showVideo();
  renderProducts();
  renderCategories();
  enableForm();
  displayVotes();
})();