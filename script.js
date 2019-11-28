function getWeatherData(lat, lng) {
  let windSpeed = document.querySelector(".wind-speed span");
  let temp = document.querySelector(".temp span");
  let humidity = document.querySelector(".humidity span");
  let weather = document.querySelector(".weather span");
  let fahrenheitConverter = document.querySelector(".fahrenheit");
  let celciusConverter = document.querySelector(".celcius");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lng}&appid=a1f9cb4478217c4136e2e1e60c175bdb`
  )
    .then(response => response.json())
    .then(data => {
      let tempValue = data.main.temp;

      windSpeed.textContent = `${data.wind.speed}km/h`;
      temp.innerText = `${tempValue}°K`;
      humidity.innerHTML = `${data.main.humidity}g/m3`;
      weather.textContent = `${data.weather[0].description}`;

      //convert temperature value
      const convertToFahrenheit = () => {
        tempValue = Math.round(((tempValue - 273.15) * 9) / 5 + 32);
        temp.textContent = `${tempValue}°F`;
        tempValue = data.main.temp;
      };

      const convertToCelcius = () => {
        tempValue = Math.round(tempValue - 273.15);
        temp.textContent = `${tempValue}°C`;
        tempValue = data.main.temp;
      };

      fahrenheitConverter.addEventListener("click", convertToFahrenheit);
      celciusConverter.addEventListener("click", convertToCelcius);
    });
}

function placesSearch() {
  let input = document.getElementById("search");

  let autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"]
  });

  google.maps.event.addListener(autocomplete, "place_changed", () => {
    let nearPlace = autocomplete.getPlace();
    let lat = nearPlace.geometry.location.lat();
    let lng = nearPlace.geometry.location.lng();

    console.log("CHANGED!!!");

    console.log(nearPlace.photos[0].html_attributions[0]);

    console.log(nearPlace);

    let img = document.getElementById("static-image");

    let imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&size=300x300&markers=icon:http://www.megaadresse.com/images/icons/google-maps.png|${lat},${lng}&zoom=17&scale=2&maptype=hybrid&key=AIzaSyC6Rg5XWaKsYOIii9RUbUWx_G5xq3LXpag`;

    img.src = imgUrl;

    console.log(imgUrl);

    getWeatherData(lat, lng);

    //share on facebook
    let fbButton = document.getElementById("fb-share-button");

    let fb = `http://www.facebook.com/sharer/sharer.php?u=${imgUrl},facebook-share-dialog,height=350,width=500`;

    fbButton.addEventListener("click", () => {
      window.open(
        `http://www.facebook.com/sharer/sharer.php?u=https://nefejames.github.io/DevC-GeoSearch/index.html,facebook-share-dialog,height=350,width=500`
      );
    });
  });
}
