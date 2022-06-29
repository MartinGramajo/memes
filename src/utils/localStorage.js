/*Esta función recibe un objeto por props*/
export function guardarEnLocalStorage(objeto) {
    const datosJson = JSON.stringify(objeto.value); //convertir el dato en Json
    localStorage.setItem(objeto.key, datosJson); //guardar En LocalStorage
}

export function leerDeLocalStorage(key) {
    const json = localStorage.getItem(key); // obtenemos la key de local
    const dato = JSON.parse(json);  // lo parseamos y lo guardamos en la variable dato
    return dato; 
} 