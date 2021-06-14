const beerSectionNode = document.getElementById("beerSection");
const headNode = document.getElementById("logo");
const randomBeer = document.getElementById("randomBtn");
const myPlusBnt = document.querySelector(".pagePlus");
const myLessBnt = document.querySelector(".pageLess");
const apiUrl = "https://api.punkapi.com/v2/beers?page=1&per_page=12";
const randomApiUrl = "https://api.punkapi.com/v2/beers/random";
const searchNode = document.getElementById("searchBar");
const buttonNode = document.getElementById("searchButton");
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

const counterObj = {
  counter: 1,
};

const dataCb = (x) => (beerSectionNode.innerHTML += printBeer(x));

const printBeer = (data) =>
  `<div class="tarjetClass">
    <div class="imgContainer">
      <a href="../description/description.html?ID=${data.id}">
    <img src="${data.image_url}"></a>
    </div>
    <a href="../description/description.html?ID=${data.id}" class="buyBtn">Más info</a>
    <div class="descriptionBox">
      <a href="../description/description.html?ID=${data.id}">
      <h3>${data.name}</h3></a>
      <p>${data.tagline}</p>
      </div>
    </div>`;

const fetchedData = (url) => {
  return fetch(url).then((res) => res.json());
};

fetchedData(apiUrl).then((data) => {
  data.map(dataCb);
  return data;
});

const allFetchedBeer = (urlArr) => {
  urlArr.map((url) => {
    return fetchedData(url).then((data) => {
      return data.map((element) => beersArr.push(element.name));
    });
  });
};

myPlusBnt.addEventListener("click", (e) => {
  headNode.scrollIntoView({ behavior: "smooth" });
  if (counterObj.counter >= 28) {
    return e.preventDefault();
  } else {
    counterObj.counter++;
    beerSectionNode.innerHTML = "";
    fetchedData(
      `https://api.punkapi.com/v2/beers?page=${counterObj.counter}&per_page=12`
    ).then((data) => data.map(dataCb));
    searchNode.scrollIntoView();
  }
});

myLessBnt.addEventListener("click", (e) => {
  headNode.scrollIntoView({ behavior: "smooth" });
  if (counterObj.counter <= 1) {
    return e.preventDefault();
  } else {
    counterObj.counter--;
    beerSectionNode.innerHTML = "";
    fetchedData(
      `https://api.punkapi.com/v2/beers?page=${counterObj.counter}&per_page=12`
    ).then((data) => data.map(dataCb));
  }
});

function debounce(search, timeout = 300, node) {
  return new Promise((res, rej) => {
    clearTimeout(timer);
    if (search == "") return;
    node.innerHTML = `<div class="loader"></div>`;
    timer = setTimeout(async () => {
      const awaitedData = await fetchedData(
        `https://api.punkapi.com/v2/beers?beer_name=${search}&per_page=80`
      );
      res(awaitedData);
    }, timeout);
  });
}

searchNode.addEventListener("keyup", (e) => {
  beerSearch = e.target.value;
  if (beerSearch === "") {
    beerSectionNode.innerHTML = "";
    fetchedData(apiUrl).then((data) => {
      data.map(dataCb);
    });
  }
  debounce(beerSearch, 1000, beerSectionNode).then((data) => {
    beerSectionNode.innerHTML = "";
    data.map(dataCb);
  });
});

randomBeer.addEventListener("click", () => {
  location.href = "../description/description.html?ID=random";
});
