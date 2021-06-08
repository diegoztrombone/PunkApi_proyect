// RANDOM JS

const beerSectionNode = document.getElementById("randomWrapper")
const randomSelector = document.getElementById("randomBtn")
const randomApiUrl = "https://api.punkapi.com/v2/beers/random"




const dataCb = x => beerSectionNode.innerHTML += printBeer(x)
const printBeer = data => `<h3>${data.name}</h3><p>${data.description}</p>`

const fetchedData = (url) => {
    return fetch(url)
    .then(res => res.json())
} 
    
fetchedData(randomApiUrl)
    .then(data => {
        data.map(dataCb)
        return data
        
})

randomSelector.addEventListener("click" , () => {
    beerSectionNode.innerHTML = ""
    fetchedData(randomApiUrl)
    .then(data => {
        data.map(dataCb)
        return data
        
})    
})












