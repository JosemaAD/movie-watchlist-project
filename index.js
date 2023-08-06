const APIKEY = '&page=1&plot=short&apikey=2d950d9b'
let filmSearched = document.getElementById('film-searched')

document.getElementById('button-addon').addEventListener('click', async() => {
    let wordSearched = filmSearched.value
    let BASEURL
    
    document.getElementById('movie-checkbox').checked === true ? BASEURL = 'https://www.omdbapi.com/?type=movie&s=' 
        : document.getElementById('serie-checkbox').checked === true ? BASEURL = 'https://www.omdbapi.com/?type=series&s=' 
        : BASEURL = 'https://www.omdbapi.com/?s=' 

    const res = await fetch(BASEURL+wordSearched+APIKEY)
    const data = await res.json()
    const filmsID = data.Search.map((film)=>{
        return film.imdbID
    })
    getFilmsDetails(filmsID)
})


async function getFilmsDetails(arr){
    let movieHtml = ''

    for(let item of arr){
        let BASEURL = `https://www.omdbapi.com/?i=`
        const res = await fetch(BASEURL+item+APIKEY)
        const data = await res.json()        
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
                    <div class="col-md-4 col-12"><p><a href="#" id="add-to-watchlist">Watchlist</a></p></div>
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

function reset(){
    filmSearched.value = ''
    document.getElementById('movie-checkbox').checked = false
    document.getElementById('serie-checkbox').checked = false
}
