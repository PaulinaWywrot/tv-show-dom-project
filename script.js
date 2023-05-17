//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const input = document.getElementById("episode-search");
const allEpisodes = getAllEpisodes();
const selectInput = document.getElementById("episode-select");
function setup() {
  makePageForEpisodes(allEpisodes);
  makePageForEpisodes(allEpisodes);
  findEpisode();
  createOption();
  selectEpisode();
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

function findEpisode() {
  input.addEventListener("input", (event) => {
    const inputValue = event.target.value.toLowerCase();
    rootElem.textContent = "";
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.summary.toLowerCase().includes(inputValue) ||
        episode.name.toLowerCase().includes(inputValue)
      );
    });
    makePageForEpisodes(filteredEpisodes);
  });
}

function createOption() {
  allEpisodes.forEach((episode) => {
    const newOption = document.createElement("option");
    newOption.innerHTML = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    selectInput.appendChild(newOption);
  });
}
function selectEpisode() {
  selectInput.addEventListener("change", (event) => {
    const inputValue = event.target.value;
    rootElem.textContent = "";
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return inputValue.includes(episode.name);
    });
    makePageForEpisodes(filteredEpisodes);
  });
}

window.onload = setup;
