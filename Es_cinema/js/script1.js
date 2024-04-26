// COLLEGAMENTI

let carousel = document.querySelector('.carosello');
let btnCerca = document.querySelector('#btnCerca');
let arrayFilm = [];
let arrayCarosello = ["The game", "The wolf of wall street", "Avatar"];
let cercaFilm = document.querySelector('#cercaFilm');

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
console.log(listaDivFilm);

function stampaFilm() {
    arrayFilm.forEach(film => {
        let arrayAttori = film.Actors.split(', ');
        let attori = arrayAttori.map(attore => `<a href="https://it.wikipedia.org/wiki/${attore}" target="_blank">${attore}</a>`).join(', ');
        console.log(arrayAttori);
        let caroselloFilm = `<div class="film d-none">

        <h2>${film.Title}</h2>

        <div class="sliderCarosello">
            <i class="fa-solid fa-angle-left" id="ciao"></i>
            <div class="locandinaCarosello">
                <img src="${film.Poster}" alt="">
            </div>
            <i class="fa-solid fa-angle-right" id="ciao1"></i>
        </div>

        <div class="attori">
            ${attori}
        </div>

        <div class="infoFilm">
            <p>Durata <span>${film.Runtime}</span></p>
            <p>Anno Uscita <span>${film.Year}</span></p>
            <p>Genere <span>${film.Genre}</span></p>
        </div>

    </div>`;

    carousel.innerHTML += caroselloFilm;

    });
    listaDivFilm[indexDivFilm].classList.remove('d-none');
}

let indexDivFilm = 0;

function avanti() {
    listaDivFilm[indexDivFilm].classList.add('d-none');
    indexDivFilm++;
    if (indexDivFilm >= listaDivFilm.length) {
        indexDivFilm = 0;
    }
    listaDivFilm[indexDivFilm].classList.remove('d-none');
}

function indietro() {
    listaDivFilm[indexDivFilm].classList.add('d-none');
    indexDivFilm--;
    if (indexDivFilm < 0) {
        indexDivFilm = listaDivFilm.length-1;
    }
    listaDivFilm[indexDivFilm].classList.remove('d-none');
}

// event.target mi restituisce l'elemento cliccato. 
carousel.addEventListener('click', function(event){
    if (event.target.classList.contains('fa-angle-left')) {
        indietro();
    } else if (event.target.classList.contains('fa-angle-right')) {
        avanti()
    }
});



let titolo = document.querySelector('.left h2');
let imgCopertina = document.querySelector('.left img');
let descrizione = document.querySelector('.right p');


async function trovaFilm() {
    let filmCercato = cercaFilm.value;
    let film = await carosello(filmCercato);
    titolo.innerHTML = film.Title;
    cercaFilm.value = '';
    imgCopertina.setAttribute('src', film.Poster);
    descrizione.innerHTML = film.Plot;
}

btnCerca.addEventListener('click', trovaFilm);
