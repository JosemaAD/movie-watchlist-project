import {getFilmsDetails} from './index.js';

const filmsFromLocalStorage = JSON.parse( localStorage.getItem("watchlist") )

let filmsID = filmsFromLocalStorage.map((film)=>{
    return film.imdbID
})

getFilmsDetails(filmsID)

document.addEventListener('click', (e) => {
    if(e.target.dataset.remove){
        handleRemoveToWatchlist(e.target.dataset.remove)
    }
})

function handleRemoveToWatchlist(filmID){
    const filmDeleted = filmsFromLocalStorage.filter(function(film){
        return film.imdbID === filmID
    })[0]
    
    //Array
    if(filmsFromLocalStorage.some(film => film.imdbID === filmDeleted.imdbID)){
        
        filmsFromLocalStorage.shift(filmDeleted)

        const index = filmsFromLocalStorage.indexOf(filmDeleted);

        filmsFromLocalStorage = filmsFromLocalStorage.splice(index, 1);


        localStorage.setItem("watchlist", JSON.stringify(filmsFromLocalStorage) )
    }

    getFilmsDetails(filmsID)
}


