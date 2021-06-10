// RANDOM JS

const beerSectionNode = document.getElementById("randomWrapper");
const randomSelector = document.getElementById("randomBtn");
const randomApiUrl = "https://api.punkapi.com/v2/beers/random";
const url = "https://api.punkapi.com/v2/beers/";

const dataCb = (x) => (beerSectionNode.innerHTML += printBeer(x));
const printBeer = (data) =>
  `<div class="beerDescriptionContainer"><div class="descriptionImg"><img src="${data.image_url}"></div><div class="descriptionBeer"><h3>${data.name}</h3><p>${data.description}</p></div></div>`;

const urlParams = new URLSearchParams(window.location.search);
let urlID = urlParams.get("ID");

const fetchedData = (url) => {
  return fetch(url).then((res) => res.json());
};

fetchedData(url + urlID).then((data) => {
  data.map(dataCb);
  return data;
});

randomSelector.addEventListener("click", () => {
  beerSectionNode.innerHTML = "";
  fetchedData(randomApiUrl).then((data) => {
    data.map(dataCb);
    return data;
  });
});
