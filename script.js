//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const input = document.getElementById("episode-search");
// const allEpisodes = getAllEpisodes();
const selectShow = document.getElementById("show-select");
const selectInput = document.getElementById("episode-select");
function setup() {
  createFetch();
  createShowName();
  selectShow();
}

function makePageForEpisodes(episodeList) {
  for (one of episodeList) {
    createEpisode(one);
  }
}

function createEpisode(episode) {
  const episodeContainer = document.createElement("div");
  const title = document.createElement("h3");
  const image = document.createElement("img");
  const summary = document.createElement("p");

  episodeContainer.classList.add("episode-container");
  title.classList.add("title");
  image.classList.add("image");
  summary.classList.add("summary");

  title.innerHTML = `${episode.name} - S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}
`;
  image.src = episode.image.medium;
  summary.innerHTML = episode.summary;

  rootElem.appendChild(episodeContainer);
  episodeContainer.appendChild(image);
  episodeContainer.appendChild(title);
  episodeContainer.appendChild(summary);
}

function findEpisode(episodes) {
  input.addEventListener("input", (event) => {
    const inputValue = event.target.value.toLowerCase();
    rootElem.textContent = "";
    const filteredEpisodes = episodes.filter((episode) => {
      return (
        episode.summary.toLowerCase().includes(inputValue) ||
        episode.name.toLowerCase().includes(inputValue)
      );
    });
    makePageForEpisodes(filteredEpisodes);
  });
}

function createOption(episodes) {
  episodes.forEach((episode) => {
    const newOption = document.createElement("option");
    newOption.innerHTML = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    selectInput.appendChild(newOption);
  });
}
function selectEpisode(episodes) {
  selectInput.addEventListener("change", (event) => {
    const inputValue = event.target.value;
    rootElem.textContent = "";
    const filteredEpisodes = episodes.filter((episode) => {
      return inputValue.includes(episode.name);
    });
    makePageForEpisodes(filteredEpisodes);
  });
}

function createFetch() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((allEpisodes) => {
      makePageForEpisodes(allEpisodes);
      findEpisode(allEpisodes);
      createOption(allEpisodes);
      selectEpisode(allEpisodes);
    })
    .catch((error) => console.log(error));
}

function createShowName() {
  const shows = getAllShows();
  shows.forEach((show) => {
    const newOption = document.createElement("option");
    newOption.innerHTML = show.name;
    selectShow.appendChild(newOption);
  });
}

function selectShow() {
  const shows = getAllShows();
  selectShow.addEventListener("change", (event) => {
    const inputValue = event.target.value;
    rootElem.textContent = "";
    const filteredShows = shows.filter((show) => {
      return inputValue.includes(show.name);
    });
    fetch(`https://api.tvmaze.com/shows/${filteredShows[0].id}/episodes`)
      .then((response) => response.json())
      .then((allEpisodes) => {
        makePageForEpisodes(allEpisodes);
        findEpisode(allEpisodes);
        createOption(allEpisodes);
        selectEpisode(allEpisodes);
      })
      .catch((error) => console.log(error));
  });
}

window.onload = setup;
