// Fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function displayLocation(trigger) {
  const locationId = trigger.getAttribute("data-location-id");
}

function toApi() {
  if (confirm("Leave site and go to rickandmortyapi.com?")) {
    window.location.href = "https://rickandmortyapi.com/";
  }
}

function toShow() {
  if (confirm("Leave site and watch Rick and Morty on Adult Swim?")) {
    window.location.href = "https://www.adultswim.com/videos/rick-and-morty/";
  }
}

// Pagination
const paginations = document.getElementsByClassName("pagination");
for (let i = 0; i < paginations.length; i++) {
  const pageItems = paginations.item(i).children;
  for (let j = 0; j < pageItems.length; j++) {
    pageItems.item(j).classList.add("page-item");
    pageItems.item(j).firstChild.classList.add("page-link");
  }
}
const currentUrl = window.location.href;
if (currentUrl.includes("filter")) {
  const links = document.getElementsByClassName("page-link");
  for (let i = 0; i < links.length; i++) {
    const oldLink = links.item(i).href;
    const a = oldLink.lastIndexOf("=");
    const pageNum = parseInt(oldLink.substring(a + 1));
    const newLink = currentUrl.split("page")[0] + "page=" + pageNum;
    links.item(i).href = newLink;
  }
}

// function getEpisodes(character) {
// const episodeLinks = character.getAttribute("data-episodes");
// const episodes = episodeLinks.split(",");
// const episodesArray = [];
// episodes.forEach((text) => {
//   const x = text.lastIndexOf("/");
//   const episodeNum = parseInt(text.substring(x + 1));
//   episodesArray.push(episodeNum);
//   });
//   const url =
//     "https://rickandmortyapi.com/api/episode/" + episodesArray.join(",");
//   const options = {
//     method: "GET",
//   };
//   // promise syntax
//   fetch(url, options)
//     .then((res) => res.json())
//     .then((json) => console.log(json))
//     .catch((err) => console.error("error:" + err));
//   try {
//     let response = fetch(url, options);
//     response = response.json();
//     alert(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `Error: ${err}` });
//   }
// }
