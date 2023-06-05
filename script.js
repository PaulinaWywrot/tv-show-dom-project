//You can edit ALL of the code here
const rootElem = document.getElementById("root");
const input = document.getElementById("episode-search");
// const allEpisodes = getAllEpisodes();
const numberOfDisplayedElements = document.querySelector(".input-label");
numberOfDisplayedElements.classList.add("input-style", "show-number");
const showRoot = document.getElementById("show-root");
const selectShow = document.getElementById("show-select");
const selectInput = document.getElementById("episode-select");
const shows = getAllShows();
function setup() {
  findShow(shows);
  createShowName();
  select_Show();
  displayShows(shows);
}

function makePageForEpisodes(episodeList) {
  numberOfDisplayedElements.innerText = `Displaying ${episodeList.length} episodes`;
  selectInput.style.display = "inline";
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
  if (episode.image !== null) {
    image.src = episode.image.medium;
  }
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
    showRoot.textContent = "";
    const filteredEpisodes = episodes.filter((episode) => {
      return (
        episode.summary.toLowerCase().includes(inputValue) ||
        episode.name.toLowerCase().includes(inputValue)
      );
    });
    makePageForEpisodes(filteredEpisodes);
    numberOfDisplayedElements.innerText = `Displaying ${filteredEpisodes.length} episodes`;
  });
}

function findShow(shows) {
  input.addEventListener("input", (event) => {
    const inputValue = event.target.value.toLowerCase();
    rootElem.textContent = "";
    showRoot.textContent = "";
    const filteredShows = shows.filter((show) => {
      return (
        show.summary.toLowerCase().includes(inputValue) ||
        show.name.toLowerCase().includes(inputValue)
      );
    });
    displayShows(filteredShows);
    numberOfDisplayedElements.innerText = `Displaying ${filteredShows.length} shows`;
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

function select_Show() {
  const shows = getAllShows();
  selectShow.addEventListener("change", (event) => {
    const inputValue = event.target.value;
    rootElem.textContent = "";
    showRoot.textContent = "";
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

function displayShows(shows) {
  selectShow.style.display = "inline";
  selectInput.style.display = "none";
  shows.map((show) => {
    const showContainer = document.createElement("div");
    showContainer.classList = "show-container";
    const showTitle = document.createElement("h2");
    showTitle.classList = "show-title";
    showTitle.innerText = show.name;

    const imageAndSummaryContainer = document.createElement("div");
    imageAndSummaryContainer.classList = "flex-container";

    const showDetails = document.createElement("div");
    showDetails.classList = "show-details";
    const showGenres = document.createElement("h4");
    showGenres.innerText = `Genres: ${show.genres}`;
    const showStatus = document.createElement("h4");
    showStatus.innerText = `Status: ${show.status}`;
    const showRuntime = document.createElement("h4");
    showRuntime.innerText = `Runtime: ${show.runtime}`;
    const showRating = document.createElement("h4");
    showRating.innerText = `⭐ ${show.rating.average}`;

    const showDetailsContainer = document.createElement("div");
    showDetailsContainer.classList = "show-details-flex";
    const showImage = document.createElement("img");
    showImage.classList = "show-image";
    if (show.image !== null) {
      showImage.src = show.image.medium;
    }
    const showSummary = document.createElement("p");
    showSummary.classList = "show-summary";
    showSummary.innerHTML = `${show.summary}`;

    showDetails.appendChild(showGenres);
    showDetails.appendChild(showStatus);
    showDetails.appendChild(showRuntime);
    showDetails.appendChild(showRating);
    imageAndSummaryContainer.appendChild(showImage);
    imageAndSummaryContainer.appendChild(showSummary);
    imageAndSummaryContainer.appendChild(showDetails);
    showContainer.appendChild(showDetailsContainer);
    showRoot.appendChild(showContainer);
    showContainer.appendChild(showTitle);
    showContainer.appendChild(imageAndSummaryContainer);

    showTitle.addEventListener("click", (event) => {
      rootElem.textContent = "";
      showRoot.textContent = "";
      fetch(`https://api.tvmaze.com/shows/${show.id}/episodes`)
        .then((response) => response.json())
        .then((allEpisodes) => {
          makePageForEpisodes(allEpisodes);
          findEpisode(allEpisodes);
          createOption(allEpisodes);
          selectEpisode(allEpisodes);
        })
        .catch((error) => console.log(error));
    });
  });
  numberOfDisplayedElements.innerText = `Displaying ${shows.length} shows`;
}

window.onload = setup;
