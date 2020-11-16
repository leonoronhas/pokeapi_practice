// Buttons
const getListButton = document.getElementById("getList");
const myButtonContainer = document.getElementById("myButton");
let nextButton;
let previousButton;

// Containers
let name;
let number;
let container;

// Page number
let pageNumberContainer = document.getElementById("pageNumber");
let p = document.createElement("p");
let pageNumber = 1;

// Offset counter
let counter = 0;

// List container where the pokemon list will be populated into
const listContainer = document.getElementById("populate");
let check = false;
let data = null;

// Get list of pokemons | limit 10 per call
const getList = () => {
  p.innerText = "Page: " + pageNumber;
  pageNumberContainer.appendChild(p);
  // Base url
  const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=10";

  // Fetch base on url
  fetch(baseURL)
    .then((response) => response.json())
    .then((pokemonList) => {
      getInfo(pokemonList);
    })
    .catch((err) => console.log(err));
};

// Get next list
const getNextList = () => {
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  counter += 10;
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${counter}`)
    .then((response) => response.json())
    .then((pokemonList) => {
      console.log("Counter is " + counter);
      console.log(pokemonList);
      getInfo(pokemonList);
    })
    .catch((err) => console.log(err));

  pageNumber++;
  p.innerText = "Page: " + pageNumber;
  pageNumberContainer.removeChild();
  pageNumberContainer.appendChild(p);
};

// Get previous list
const getPreviousList = () => {
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  counter -= 10;

  if (counter < 10) {
    previousButton.remove();
  }
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${counter}`)
    .then((response) => response.json())
    .then((pokemonList) => {
      console.log("Counter is " + counter);
      console.log(pokemonList);
      getInfo(pokemonList);
    })
    .catch((err) => console.log(err));

  pageNumber--;
  p.innerText = "Page: " + pageNumber;
  pageNumberContainer.removeChild();
  pageNumberContainer.appendChild(p);
};

// Start over function
const startOver = () => location.reload();

// Function to render the list with the info needed
const getInfo = (pokeData) => {
  check = true;

  // Delete placeholder text
  let deleteMe = document.getElementById("placeholder");
  if (deleteMe != null) {
    deleteMe.remove();
  }

  for (let i = 0; i < pokeData.results.length; i++) {
    // Elements for the pokemon data to be display as

    name = document.createElement("h4");
    container = document.createElement("div");

    // Add styling to each div
    container.style.display = "flex";
    container.style.flexDirection = "row";
    container.style.justifyContent = "space-evenly";

    // Assign the value from the API call
    name.innerText = pokeData.results[i].name;

    // Append into the div
    container.append(name);
    listContainer.appendChild(container);
  }

  if (check) {
    console.log("Inside check and check is " + check);
    getListButton.remove();

    if (nextButton == null) {
      nextButton = document.createElement("button");
      previousButton = document.createElement("button");

      previousButton.innerText = "Previous";
      nextButton.innerText = "Next";
    }

    nextButton.onclick = () => getNextList();
    previousButton.onclick = () => getPreviousList();

    if (counter > 0) {
      myButtonContainer.appendChild(previousButton);
    }

    myButtonContainer.appendChild(nextButton);
  }
};
