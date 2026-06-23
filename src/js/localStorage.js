
const formSuscripcion = document.getElementById('novedades_form');
const containerSuscrito = document.getElementById('novedades_suscrito');

const mostrarSeccionSegunSuscripcion = () => {
  const datos = JSON.parse(localStorage.getItem('suscripcion') || 'null');

  if (datos) {

    formSuscripcion.classList.add('hidden');
    containerSuscrito.classList.remove('hidden');
    document.getElementById('suscrito-nombre').textContent = datos.usuario;
    document.getElementById('suscrito-categorias').textContent = datos.intereses.join(', ');

  } else {
    formSuscripcion.classList.remove('hidden');
    containerSuscrito.classList.add('hidden');
  }
};



(() => {
    // Al cargar la página
    mostrarSeccionSegunSuscripcion();
})();

export {mostrarSeccionSegunSuscripcion}