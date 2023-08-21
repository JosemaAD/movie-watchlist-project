import {reset, loading, getCurrentURL} from './utils.js';

const APIKEY = '&page=1&plot=short&apikey=2d950d9b'
const filmSearched = document.getElementById('film-searched')
let filmsObjArray = []
let watchlist = []

let watchlistFromLocalStorage = JSON.parse( localStorage.getItem("watchlist") )
watchlistFromLocalStorage ? watchlist = watchlistFromLocalStorage : watchlist = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.add){
        handleAddToWatchlist(e.target.dataset.add) 
        handlefilmAddedtoWatchlist(e.target.dataset.add)
    }
})

document.getElementById('search-film-btn').addEventListener('click', async() => {
    let wordSearched = filmSearched.value
    let BASEURL
    document.getElementById('movie-checkbox').checked === true ? BASEURL = 'https://www.omdbapi.com/?type=movie&s=' 
        : document.getElementById('serie-checkbox').checked === true ? BASEURL = 'https://www.omdbapi.com/?type=series&s=' 
        : BASEURL = 'https://www.omdbapi.com/?s=' 

    const res = await fetch(BASEURL+wordSearched+APIKEY)
    const data = await res.json()
    
    filmsObjArray = data.Search

    let filmsID = filmsObjArray.map((film)=>{
        return film.imdbID
    })

    getFilmsDetails(filmsID)
})

export async function getFilmsDetails(arr){
    document.getElementById('films').innerHTML = loading()
    let movieHtml = ''
    for(let item of arr){
        let BASEURL = `https://www.omdbapi.com/?i=`
        const res = await fetch(BASEURL+item+APIKEY)
        const data = await res.json()
        
        let button = ''    
        if(getCurrentURL() === 'watchlist.html'){
            button = `<div class="col-md-4 col-12"><p><a href="" class="add-to-watchlist" data-remove="${data.imdbID}">remove</a></p></div>`
        }else{
            button = `<div class="col-md-4 col-12"><p><a href="#" class="add-to-watchlist" data-add="${data.imdbID}">add to my list</a></p></div>`
        }
           
        movieHtml += `
                    <div class="row my-3 align-items-center">
                        <div class="col-md-3 col-6">
                            <img src="${data.Poster}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-9 col-6">
                            <h3 class="film-title d-inline">${data.Title}</h3><i class="bi bi-star-fill"></i><p class="film-rating">${data.imdbRating}</p>
                            <div class="row align-items-center justify-content-center">
                                <div class="col-md-3 col-12"><p class="film-runtime">${data.Runtime}</p></div>
                                <div class="col-md-5 col-12"><p class="film-genre">${data.Genre}</p></div>
                                ${button}
                            </div>
                            <p class="film-plot">${data.Plot}</p>
                        </div>
                    </div>
                    <hr>
                    `
    }
    reset()
    document.getElementById('films').innerHTML = movieHtml
}

function handleAddToWatchlist(filmID){
    const filmAdded = filmsObjArray.filter(function(film){
        return film.imdbID === filmID
    })[0]
    
    //Array
    if(watchlist.some(film => film.imdbID === filmAdded.imdbID)){
        setTimeout(() => {
            document.querySelectorAll(`[data-add="${filmAdded.imdbID}"]`)[0].childNodes[0].data = 'already in your watchlist'
        }, 1000)
        
    }else{
        watchlist.unshift(filmAdded)
    }
    //Mandar a localStorage watchlist
    localStorage.setItem("watchlist", JSON.stringify(watchlist) )
}

function handlefilmAddedtoWatchlist(filmID){
    let filmAdded = document.querySelectorAll(`[data-add="${filmID}"]`)
    filmAdded[0].childNodes[0].data = 'added'
}


  
getCurrentURL()

export default watchlist;