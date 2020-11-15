// Buttons
const getListButton = document.getElementById("getList");
const previousListbutton = document.getElementById("previousList");

// List container where the pokemon list will be populated into
const listContainer = document.getElementById("populate");

// Get list of pokemons | limit 10 per call
const getList = (url) => {
  // Base url
  const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=10";

  // Fetch base on url
  fetch(baseURL ? baseURL : url)
    .then((response) => response.json())
    .then((pokemonList) => getInfo(pokemonList))
    .catch((err) => console.log(err));
};

// Get next list
const getNextList = (pokeData) => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=10")
    .then((response) => response.json())
    .then((pokemonList) => {
      console.log(pokemonList.next);
    })
    .catch((err) => console.log(err));
};

// Function to render the list with the info needed
const getInfo = (pokeData) => {
  // Delete placeholder text
  let deleteMe = document.getElementById("placeholder");
  deleteMe.remove();

  for (let i = 0; i < pokeData.results.length; i++) {
    // Elements for the pokemon data to be display as
    let name = document.createElement("h4");
    let number = document.createElement("h4");
    let container = document.createElement("div");

    // Add styling to each div
    container.style.display = "flex";
    container.style.flexDirection = "row";
    container.style.justifyContent = "space-evenly";

    // Assign the value from the API call
    name.innerText = pokeData.results[i].name;
    number.innerText = i + 1;

    // Append into the div
    container.append(number, name);
    listContainer.appendChild(container);
  }
};
