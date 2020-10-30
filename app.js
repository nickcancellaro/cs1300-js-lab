var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=cezK_BRWwDpdJK3E6AKcbavkkj2AyZsvmwOF_IGrMJc";
let plantData;

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/distributions/144/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      plantData = JSON.parse(request.response).data;
      console.log(plantData);
    })
);

const fillDiv = () => {
  const space = document.getElementById('plants');
  plantData.forEach(item => {
    let plant = document.createElement('div');
    let image = document.createElement('img');
    image.setAttribute("src", item.image_url);
    let name = document.createElement('h2');
    name.innerHTML = "Name: " + item.common_name;
    let family = document.createElement('h2');
    family.innerHTML = "Family: " + item.family;
    plant.appendChild(image);
    plant.appendChild(name);
    plant.appendChild(family);
    space.appendChild(plant);
  });
};