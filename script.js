const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
    .then((response) => response.json())
    .then((results) => displayResults(results));
}

function displayResults(results) {
  hidePlaylists();
  const artistImage = document.getElementById("artist-img");
  const artistName = document.getElementById("artist-name");

  results.forEach((element) => {
    if (element.urlImg) {
      artistImage.src = element.urlImg; 
      artistName.innerText = element.name;
      resultArtist.classList.remove("hidden");
    } else {
      console.error("URL da imagem não encontrada nos dados do artista:", element);
    }
  });
}

function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});

// Obtendo o elemento onde a saudação será exibida
const greetingElement = document.getElementById("getGreeting");

// Função para obter a saudação com base no horário
function getGreeting() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Bom dia";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Boa tarde";
    } else {
        return "Boa noite";
    }
}

// Obtendo a saudação
const greeting = getGreeting();

// Definindo o texto do elemento com a saudação
greetingElement.textContent = greeting;
