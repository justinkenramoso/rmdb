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
