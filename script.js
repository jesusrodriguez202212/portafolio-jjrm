// se encarga de verificar si se tiene un service worcker y sí no lo registra
if ('serviceWorker' in navigator) {
    window.addEventListener('load',function(){
        navigator.serviceWorker.register('./serviceworker.js')
        .then(registro => {
            console.log("El service worker se registro de manera correcta");
        })
        .catch(e =>{
            console.warn("El service worker no se registro",e);
        })
    })
}