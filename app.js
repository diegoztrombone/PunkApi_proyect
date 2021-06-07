const beerSectionNode = document.getElementById("beerSection")
const myBntNode = document.getElementById("myBnt")
const myPlusBnt = document.getElementById("pagePlus")
const myLessBnt = document.getElementById("pageLess")
const apiUrl = "https://api.punkapi.com/v2/beers"
const randomApiUrl = "https://api.punkapi.com/v2/beers/random"


let counter = 1

const fetchedData = (url) => {
    return fetch(url)
    .then(res => res.json())
} 
    
fetchedData(apiUrl)
    .then(data => {
        data.map(dataCb)
        return data
        
})

myBntNode.addEventListener("click", () => {
    beerSectionNode.innerHTML = ""
    fetchedData(randomApiUrl)
        .then(data => data.map(dataCb))
})

myPlusBnt.addEventListener("click", () => {
    counter++
    beerSectionNode.innerHTML = ""
    fetchedData(`https://api.punkapi.com/v2/beers?page=${counter}&per_page=25`)
        .then(data => data.map(dataCb))
    
})

myLessBnt.addEventListener("click", () => {
    counter--
    beerSectionNode.innerHTML = ""
    fetchedData(`https://api.punkapi.com/v2/beers?page=${counter}&per_page=25`)
        .then(data => data.map(dataCb))
    console.log(counter)
})



const dataCb = x => beerSectionNode.innerHTML += printBeer(x)


const printBeer = data => `<h3>${data.name}</h3><p>${data.description}</p>`





