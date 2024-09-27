// All earthquakes in the last 7 days (may be too cluttered)
const DATA_SOURCE =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create the createMap function.
function createMap(layerGroup) {
  // Create the tile layer that will be the background of our map.
  let street = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  // Create the map object with options.
  let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2,
    layers: [street, layerGroup],
  });
}

// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "features" property from response.
  let features = response.features;
  // Initialize an array to hold the quake markers.
  let markers = [];
  // Loop through the features array.
  features.forEach((f) => {
    // For each quake, create a marker, and bind a popup.
    // Add the marker to the markers array.
    let details = `Magnitude: ${f.properties.mag}<BR>Location: ${f.properties.place}<BR>Depth: ${f.geometry.coordinates[2]}km`;
    markers.push(
      L.marker([
        f.geometry.coordinates[1],
        f.geometry.coordinates[0],
      ]).bindPopup(details)
    );
  });

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  console.log(markers);
  let layerGroup = L.layerGroup(markers);
  createMap(layerGroup);
}

d3.json(DATA_SOURCE).then(function (response) {
  console.log(response);
  createMarkers(response);
});
