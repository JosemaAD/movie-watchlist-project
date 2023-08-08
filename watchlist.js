import {getFilmsDetails} from './index.js';

const filmsFromLocalStorage = JSON.parse( localStorage.getItem("watchlist") )

let filmsID = filmsFromLocalStorage.map((film)=>{
    return film.imdbID
})

getFilmsDetails(filmsID)



