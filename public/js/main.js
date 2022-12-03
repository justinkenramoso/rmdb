function movePage(button) {
  const rawUri = button.getAttribute("data-url");
  const encodedUri = encodeURIComponent(rawUri);
  const url = "/characters/page/?url=" + encodedUri;
  window.location.href = url;
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
