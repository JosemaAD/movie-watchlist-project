export function reset(){
    document.getElementById('film-searched').value = ''
    document.getElementById('movie-checkbox').checked = false
    document.getElementById('serie-checkbox').checked = false
}

export function loading(){
    return `<img src="./images/loading.gif">`
}

export function getCurrentURL () {
    let url = window.location.href
    let slug = url.split('/')
    console.log(slug[3])
    return slug[3]
}