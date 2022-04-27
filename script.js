const dataSection = document.getElementById("data");
const form = document.getElementById("myForm");

const displayData = (data) => {
   if (data.cod == 404) {
      dataSection.innerHTML = "No weather data found!";
   } else {
      const dataSection = document.getElementById("data");
      const heading = document.createElement("h2");
      const parentDiv = document.createElement("div");
      const img = document.createElement("img");
      const temp = document.createElement("p");
      heading.textContent = "Weather in " + data.name + ", " + data.sys.country;
      let temperature = data.main.temp;
      temp.textContent =
         "Current temperature: " + temperature.toFixed(2) + "°C";
      dataSection.innerHTML = "";
      dataSection.appendChild(heading);
      dataSection.appendChild(parentDiv);
      img.setAttribute(
         "src",
         "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      dataSection.appendChild(img);
      dataSection.appendChild(temp);
      console.log(data.weather[0].description);
   }
};

const getData = (e) => {
   e.preventDefault();
   const location = document.getElementById("location");
   const locationData = location.value;
   if (locationData.length == 0) {
      dataSection.innerHTML = "Please enter city name!";
   } else {
      const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
      const apiKey = "f73757d7f42c8b196572823b173fc15f";

      const url = baseUrl + locationData + "&units=metric&&appid=" + apiKey;

      let ajax = new XMLHttpRequest();

      ajax.open("GET", url, true);
      ajax.onload = function () {
         if (this.status == 200) {
            let data = JSON.parse(this.responseText);
            displayData(data);
            console.log(data);
         }
      };
      ajax.send();
   }
};

form.addEventListener("submit", getData);
