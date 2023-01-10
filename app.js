const formData = document.querySelector("#form-data");
const userInput = document.querySelector("#user-input");
const searchBtn = document.querySelector("#get-result");
const output = document.querySelector("#output");

function getURL(text) {
  let serverURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${text}`;
  //   console.log(serverURL);
  return serverURL;
}

function display(result) {
  output.innerHTML = " ";
  output.insertAdjacentHTML(
    "beforeend",
    `<h3>Search results for <span>${userInput.value}</span></h3>`
  );
  result.forEach((item) => {
    let title = item.title;
    let snippet = item.snippet;
    let itemURL = encodeURI(`https://en.wikipedia.org/wiki/${title}`);
    // console.log(title);
    // console.log(snippet);
    // console.log(itemURL);
    output.insertAdjacentHTML(
      "beforeend",
      `<div id="change"><h2>${title}</h2><p>${snippet}<a href=${itemURL}>Read More</a></p></div>`
    );
  });

  //   console.log(result);
}

function searchHandler() {
  //   console.log(userInput.value);
  fetch(getURL(userInput.value))
    .then((response) => response.json())
    .then((json) => {
      let arrayResults = json.query.search;
      display(arrayResults);
    })
    // .then((json) => console.log(json.query.search))
    .catch((error) => console.log(error));
}
searchBtn.addEventListener("click", searchHandler);
