/* Se ejecuta en <head> antes del primer renderizado: marca que JavaScript está disponible
   para que el CSS pueda mejorar el menú móvil sin dejar el sitio inutilizable sin JS. */
document.documentElement.classList.add('js');
