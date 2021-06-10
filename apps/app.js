const beerSectionNode = document.getElementById("beerSection");
const randomBeer = document.getElementById("randomBtn");
const myPlusBnt = document.getElementById("pagePlus");
const myLessBnt = document.getElementById("pageLess");
const apiUrl = "https://api.punkapi.com/v2/beers?page=1&per_page=10";
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
  `<div class="tarjetClass"><div class="imgContainer"><img src="${data.image_url}"></div><div class="descriptionBox"><a href="../description/description.html?ID=${data.id}"><h3>${data.name}</h3></a></div></div>`;

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
  if (counterObj.counter >= 32) {
    return e.preventDefault();
  } else {
    counterObj.counter++;
    beerSectionNode.innerHTML = "";
    fetchedData(
      `https://api.punkapi.com/v2/beers?page=${counterObj.counter}&per_page=10`
    ).then((data) => data.map(dataCb));
  }
});

myLessBnt.addEventListener("click", (e) => {
  allFetchedBeer(allBeerArr);
  if (counterObj.counter <= 1) {
    return e.preventDefault();
  } else {
    counterObj.counter--;
    beerSectionNode.innerHTML = "";
    beerSectionNode.innerHTML = "Loading";
    fetchedData(
      `https://api.punkapi.com/v2/beers?page=${counterObj.counter}&per_page=10`
    ).then((data) => data.map(dataCb));
  }
});

function debounce(search, timeout = 300, node) {
  return new Promise((res, rej) => {
    clearTimeout(timer);
    if (search == "") return;
    node.innerHTML = "Loading";
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

  // beerSectionNode.innerHTML = ""
  // let beersFilter = beersArr.filter((element) => {
  //     return element.toLowerCase().includes(beerSearch)

  // })
  // console.log(beersFilter)
});

randomBeer.addEventListener("click", () => {
  location.href = "../description/description.html?ID=random";
});
