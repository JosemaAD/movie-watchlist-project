import {getFilmsDetails} from './index.js';

let filmsFromLocalStorage = JSON.parse( localStorage.getItem("watchlist") )
let filmsID = filmsFromLocalStorage.map((film)=>{
    return film.imdbID
})

getFilmsDetails(filmsID)

document.addEventListener('click', (e) => {
    if(e.target.dataset.remove){
        e.preventDefault()
        handleRemoveToWatchlist(e.target.dataset.remove)
    }
})

function printFilmsOnWatchlist(films){
    let movieHtml = ''
    
    for(let film of films){
        movieHtml += `
                    <div class="row my-3 align-items-center">
                        <div class="col-md-3 col-6">
                            <img src="${film.Poster}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-9 col-6">
                            <h3 class="film-title d-inline">${film.Title}</h3><i class="bi bi-star-fill"></i><p class="film-rating">${film.imdbRating}</p>
                            <div class="row align-items-center justify-content-center">
                                <div class="col-md-3 col-12"><p class="film-runtime">${film.Runtime}</p></div>
                                <div class="col-md-5 col-12"><p class="film-genre">${film.Genre}</p></div>
                                <div class="col-md-4 col-12"><p><a href="" class="add-to-watchlist" data-remove="${film.imdbID}">remove</a></p></div>
                            </div>
                            <p class="film-plot">${film.Plot}</p>
                        </div>
                    </div>
                    <hr>
                    `
    }
    document.getElementById('films').innerHTML = movieHtml
}

function handleRemoveToWatchlist(filmID){
    const filmDeleted = filmsFromLocalStorage.filter(function(film){
        return film.imdbID === filmID
    })[0]
    
    const index = filmsFromLocalStorage.indexOf(filmDeleted)
    
    filmsFromLocalStorage.splice(index, 1)
    
    filmsID = filmsFromLocalStorage.map((film)=>{
        return film.imdbID
    })

    getFilmsDetails(filmsID)

    localStorage.setItem("watchlist", JSON.stringify(filmsFromLocalStorage))

}