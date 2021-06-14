console.log("entra");
const searchSection = document.getElementById("searchPlace");
const searchNode = document.getElementById("searchBar");
const allBeerArr = [
  "https://api.punkapi.com/v2/beers?page=1&per_page=80",
  "https://api.punkapi.com/v2/beers?page=2&per_page=80",
  "https://api.punkapi.com/v2/beers?page=3&per_page=80",
  "https://api.punkapi.com/v2/beers?page=4&per_page=80",
  "https://api.punkapi.com/v2/beers?page=5&per_page=80",
];

let beersArr = [];
let beerSearch = "";
let timer;

const dataCb = (x) => (searchSection.innerHTML += printBeer(x));

const printBeer = (data) =>
  `<div class="searchList">
   <a href="./description/description.html?ID=${data.id}">${data.name}</a>
    </div>`;

const fetchedData = (url) => {
  return fetch(url).then((res) => res.json());
};

const allFetchedBeer = (urlArr) => {
  urlArr.map((url) => {
    return fetchedData(url).then((data) => {
      return data.map((element) => beersArr.push(element.name));
    });
  });
};

function debounce(search, timeout = 300, node) {
  return new Promise((res, rej) => {
    clearTimeout(timer);
    if (search == "") return;
    node.innerHTML = `<div class="loader indexLoader"></div>`;
    timer = setTimeout(async () => {
      const awaitedData = await fetchedData(
        `https://api.punkapi.com/v2/beers?beer_name=${search}&per_page=5`
      );
      res(awaitedData);
    }, timeout);
  });
}

searchNode.addEventListener("keyup", (e) => {
  beerSearch = e.target.value;
  if (beerSearch === "") {
    searchSection.innerHTML = "";
  }
  debounce(beerSearch, 1500, searchSection).then((data) => {
    searchSection.innerHTML = "";
    data.map(dataCb);
  });
});
