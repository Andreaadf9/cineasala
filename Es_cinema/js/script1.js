// COLLEGAMENTI

let carousel = document.querySelector('.carosello');
let btnCerca = document.querySelector('#btnCerca');
let arrayFilm = [];
let arrayCarosello = ["The game", "The wolf of wall street", "Avatar"];

const APIKEY = "4214e970";
const ENDPOINT = "https://www.omdbapi.com/?";

async function carosello(titolo) {
    // await permette di attendere la fine dell'esecuzione di un istruzione. Altrimenti senza non finirebbe l'operazione e sarebbe undefined.
    // Il for non riuscirebbe a caricare i dati in tempo dalla fetch. è come se da una chiamata asincrona passasse a sincrona.
    let response = await fetch(`${ENDPOINT}t=${titolo}&apikey=${APIKEY}`);
        return response.json();
}


async function caricamentoDatiCarosello() {
    for (let i = 0; i < arrayCarosello.length; i++) {
        let titoloFilm = arrayCarosello[i];
        let infoFilm = await carosello(titoloFilm);
        arrayFilm.push(infoFilm);
        console.log(arrayFilm);
        
    }
    stampaFilm();
    // query selector non è live quindi se lo esegui prima della creazione degli elementi, dopo non vede la node list aggiornata, quindi lo metto qui dentro
    //let caso = document.querySelectorAll('.film');
}
caricamentoDatiCarosello()

// questo a differenza di quello usato sopra 'caso' si aggiorna live automaticamente
let listaDivFilm = document.getElementsByClassName('film');
console.log(lista);

function stampaFilm() {
    arrayFilm.forEach(film => {
        let caroselloFilm = `<div class="film d-none">

        <h2>${film.Title}</h2>

        <div class="sliderCarosello">
            <i class="fa-solid fa-angle-left"></i>
            <div class="locandinaCarosello">
                <img src="${film.Poster}" alt="">
            </div>
            <i class="fa-solid fa-angle-right"></i>
        </div>

        <div class="attori">
            <a href="">${film.Actors}</a>
        </div>

        <div class="infoFilm">
            <p>Durata <span>${film.Runtime}</span></p>
            <p>Anno Uscita <span>${film.Year}</span></p>
            <p>Genere <span>${film.Genre}</span></p>
        </div>

    </div>`;

    carousel.innerHTML += caroselloFilm;

    });
    listaDivFilm[0].classList.remove('d-none');
}


function avanti() {

}

function indietro() {

}

function cercaFilm() {
    
}

btnCerca.addEventListener('click', cercaFilm);





{/* <a href="">${film.Poster}</a>
<a href="">${film.Poster}</a> */}