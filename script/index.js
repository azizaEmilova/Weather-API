const API = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=06dfbb799702c5d4bf966e2b83a41d1c"; // API key

const form = document.querySelector("form");
const input = document.getElementById("inp");
const output = document.querySelector(".output");
const text_content = document.querySelector("#text_content");

const getWeather = async () => {
  const url = API + input.value + apiKey;
  const req = await fetch(url);
  const res = await req.json();
//   console.log(res);
  renderWeather(res);
  getMap(res.coord)
  input.value = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();

});

const renderWeather = (data) => {
   output.innerHTML = ''
  text_content.innerHTML = ""; ///чтоб было новое значение--перезапись
  const cityName = document.createElement("h1");
  cityName.textContent = "City:" + data.name;

  const wind = document.createElement("p");
  wind.textContent = `Wind: speed -${data.wind.speed} guest - ${data.wind.gust} deg-${data.wind.deg}`; 

  const tempC = document.createElement("h4");
  tempC.document = `Temp:${Math.floor(data.main.temp - 273.15)}C`;

  const tempF = document.createElement("h4");
  tempF.textContent = `Temp:${Math.floor(
    (data.main.temp - 273.15) * 1.8 + 32
  )}`;

  const clouds = document.createElement("h2");
  clouds.textContent = "Clouds:" + data.clouds.all;

  text_content.append(cityName, wind, tempC, tempF, clouds);
  output.append(text_content);
};

const getMap = ({lat,lon}) => {
  let map = document.createElement("div");
  map.id = "map"

  DG.then(() => {
    map = DG.map("map", {
      center: [lat, lon],
      zoom: 13,
    });

    DG.marker([lat,lon]).addTo(map).bindPopup("hello!");
  });
  output.append(map);
};
