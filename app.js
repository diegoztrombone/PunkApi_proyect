// TO DO:
// Make independient pags (home-with random btn, bio, cervezas, contacto)
// Work in CSS, mobile first
// Search engine

const beerSectionNode = document.getElementById("beerSection")
const randomBeer = document.getElementById("myBnt")
const myPlusBnt = document.getElementById("pagePlus")
const myLessBnt = document.getElementById("pageLess")
const apiUrl = "https://api.punkapi.com/v2/beers"
const randomApiUrl = "https://api.punkapi.com/v2/beers/random"




const counterObj = {
    counter : 1,
}

const dataCb = x => beerSectionNode.innerHTML += printBeer(x)
const printBeer = data => `<h3>${data.name}</h3><p>${data.description}</p>`

const fetchedData = (url) => {
    return fetch(url)
    .then(res => res.json())
} 
    
fetchedData(apiUrl)
    .then(data => {
        data.map(dataCb)
        return data
        
})

randomBeer.addEventListener("click", () => {
    beerSectionNode.innerHTML = ""
    fetchedData(randomApiUrl)
        .then(data => data.map(dataCb))
})

myPlusBnt.addEventListener("click", (e) => {
    if (counterObj.counter >= 13) {
        return e.preventDefault()
    } else {
        counterObj.counter++
        beerSectionNode.innerHTML = ""
        fetchedData(`https://api.punkapi.com/v2/beers?page=${counterObj.counter}&per_page=25`)
            .then(data => data.map(dataCb))
    }
    
    
})

myLessBnt.addEventListener("click", (e) => {
    if (counterObj.counter <= 1) {
        return e.preventDefault() 
    } else {
        counterObj.counter--
        beerSectionNode.innerHTML = ""
        fetchedData(`https://api.punkapi.com/v2/beers?page=${counterObj.counter}&per_page=25`)
            .then(data => data.map(dataCb))     
    }        
})







