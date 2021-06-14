// RANDOM JS

const beerSectionNode = document.getElementById("descriptionWrapper");
const beerDescriptionNode = document.getElementById("randomBtn");
const randomApiUrl = "https://api.punkapi.com/v2/beers/random";
const url = "https://api.punkapi.com/v2/beers/";

const arrCordenadas = [
  [51.505, -0.09],
  [40.4215617755179, -3.692718822586086],
  [38.03443599791859, -3.291917453424889],
  [64.13478167490577, -21.942270642783374],
  [28.207805535611026, -177.37341964023085],
];

let random;
const myCord = (arr) => {
  random = ~~(Math.random() * 5);
  return arr[random];
};

let mymap = L.map("mapid").setView(myCord(arrCordenadas), 14);
let marker = L.marker(arrCordenadas[random]).addTo(mymap);
const mytkn =
  "pk.eyJ1IjoiZGllZ296dHJvbWJvbmUiLCJhIjoiY2twd3A0enVpMDM1bjJwbnd6czdsaWpwaCJ9.5qMIpIvhu5UMvZHsP_s7eg";
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mytkn,
  }
).addTo(mymap);

const dataCb = (x) => {
  beerSectionNode.innerHTML += printBeer(x);
  document.title = `${x.name} - Punk API`;
};
const printBeer = (data) =>
  `<div class="beerContainer"><div class="descriptionImg"><img src="${data.image_url}"></div><div class="descriptionText"><h3>${data.name}</h3><p>${data.description}</p></div></div>`;

const urlParams = new URLSearchParams(window.location.search);
let urlID = urlParams.get("ID");

const fetchedData = (url) => {
  return fetch(url).then((res) => res.json());
};

fetchedData(url + urlID).then((data) => {
  data.map(dataCb);
  return data;
});

beerDescriptionNode.addEventListener("click", () => {
  beerSectionNode.innerHTML = "";
  fetchedData(randomApiUrl).then((data) => {
    data.map(dataCb);
    return data;
  });
});
