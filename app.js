const beerSectionNode = document.getElementById("beerSection")
const randomBeer = document.getElementById("myBnt")
const myPlusBnt = document.getElementById("pagePlus")
const myLessBnt = document.getElementById("pageLess")
const apiUrl = "https://api.punkapi.com/v2/beers"
const randomApiUrl = "https://api.punkapi.com/v2/beers/random"

myLessBnt.style.visibility = "hidden"


const counterObj = {
    counter : 1,
    upper: function () {
        this.counter++
        if (this.counter >= 1) {myLessBnt.style.visibility = "visible"}
        if (this.counter >= 13) {myPlusBnt.style.visibility = "hidden"}  
        return this.counter
    },
    downer: function () {
        this.counter--
        if (this.counter <= 1) {myLessBnt.style.visibility = "hidden"}
        if (this.counter <= 12){myPlusBnt.style.visibility = "visible"} 
        return this.counter
    } 
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

myPlusBnt.addEventListener("click", () => {
    counterObj.upper()
    beerSectionNode.innerHTML = ""
    fetchedData(`https://api.punkapi.com/v2/beers?page=${counterObj.counter}&per_page=25`)
        .then(data => data.map(dataCb))
    
    
})

myLessBnt.addEventListener("click", () => {
    counterObj.downer()
    beerSectionNode.innerHTML = ""
    fetchedData(`https://api.punkapi.com/v2/beers?page=${counterObj.counter}&per_page=25`)
        .then(data => data.map(dataCb)) 
      
})







