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
        `http://www.facebook.com/sharer/sharer.php?u=${window.location.href},facebook-share-dialog,height=350,width=500`
      );
    });
  });
}
