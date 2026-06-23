
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

    document.getElementById('btn-cambiar-suscripcion').addEventListener('click', () => {
        const datos = JSON.parse(localStorage.getItem('suscripcion') || 'null');
    
        if (datos) {
          // Prellenar campos de texto
          document.getElementById('usuario').value = datos.usuario;
          document.getElementById('email').value = datos.email;
      
          // Desmarcar todos los checkboxes primero (por si cambiaron antes)
          document.querySelectorAll('input[name="intereses[]"]').forEach(checkbox => {
            checkbox.checked = datos.intereses.includes(checkbox.value);
          });
        }
      
        formSuscripcion.classList.remove('hidden');
        containerSuscrito.classList.add('hidden')
    });
})();

export {mostrarSeccionSegunSuscripcion}