function placesSearch() {
  let input = document.getElementById("search");

  let autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"]
  });


}
