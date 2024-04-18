// COLLEGAMENTI

let carousel = document.querySelector('.carosello');
let btnCerca = document.querySelector('#btnCerca');
let arrayFilm = [];
let arrayCarosello = ["The game", "The wolf of wall street", "Avatar"];

const APIKEY = "4214e970";
const ENDPOINT = "https://www.omdbapi.com/?";

function carosello(titolo) {
    fetch(`${ENDPOINT}t=${titolo}&apikey=${APIKEY}`)
    .then(data => {
        return data.json();
    })
    .then(response => {
        return response;
    })
}


function caricamentoDatiCarosello() {
    for (let i = 0; i < arrayCarosello.length; i++) {
        let titoloFilm = arrayCarosello[i];
        carosello(titoloFilm)
        .then(infoFilm => {
            console.log(infoFilm); // Dati del film
            arrayFilm.push(infoFilm); // Aggiungi il film all'array
            console.log(arrayFilm); // Array con i film aggiunti
        })
    }
}
caricamentoDatiCarosello()


function avanti() {

}

function indietro() {

}

function cercaFilm() {
    
}

btnCerca.addEventListener('click', cercaFilm);





