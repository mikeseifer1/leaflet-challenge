// Creating map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Adding tile layer
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  })
  
  graymap.addTo(myMap);



// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  //createFeatures(data.features);

  // Create three function. One to calculate radiues, the other color and the other magnitude

  function mapStyle(feature) {
      return{
          opacity: 1,
          fillOpacity: 1,
          fillColor: mapColor(feature.properties.mag),
          color: "#000000",
          radius: mapRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
      };

 
  }

    function mapColor(magnitude){
        switch (true) {
            case magnitude > 5:
            return "#ff0000";
            
            case magnitude > 4:
                return "#ff8c00";
            case magnitude > 3:
                return "#90ee90";
            case magnitude > 2:
                return "#6495ed";
            case magnitude >1:
                return "#FFFC33";
            default:
                return "#FFFFFF";   
        }
    }


    function mapRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude *4;
    }

    // Add the Geo Json layer to the map 

    L.geoJson(data, {
        // turn each feature into circlemarker 
        pointToLayer: function(feature, latlong) {
            return L.circleMarker(latlong)
        },

        // Seting the style the circle marker
        style: mapStyle,

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.mag +
        "</h3><hr><p>" + feature.properties.place + "</p>");
        }
    }).addTo(myMap)


    // function getColor(c) {
    //    return   c === 0 ? "white" :
    //             c === 1 ? "#f0f8ff" :
    //             c === 2 ? "#6495ed" :
    //             c === 3 ? "#90ee90" :
    //             c === 4 ? "#ff8c00" :
    //             c === 5 ? "#ff0000" :
    //                         "#ff7f00";
        
    // }

    // function style(feature) {
    //     return {
    //         weight: 1.5,
    //         opacity: 1,
    //         fillOpacity: 1,
    //         radius: 6,
    //         fillColor: getColor(c),
    //         color: "grey"

    //     };
    // }

    // Lets add the legends
    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        labels = ['<strong>Earthquake Magnitude</strong>'],
        //grades = [0,1,2,3,4,5],
        grades = ['0-1', '1-2', '2-3', '3-4', '4-5', '5+'];
        colors = ["white","#FFFC33","#6495ed","#90ee90","#ff8c00","#ff0000"];

        for (var i = 0; i < colors.length; i++) {
            div.innerHTML += 
            labels.push(
            '<i style = "background:'+ colors[i] + '">   </i> ' +
            //grades[i] + (grades [i + 1] ? " - " + grades[i+1] + '<br>': '+ '));
            (grades[i] ? grades[i] : '+'));
        }
         div.innerHTML = labels.join('<br>');
         //div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;


    };
    
    legend.addTo(myMap)

//second legend
// var legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var grades = [0,1,2,3,4,5];
//     var colors = ["#FFFFFF","#f0f8ff","#6495ed","#90ee90","#ff8c00","#ff0000"];
//     var labels = [];
//     //div.innerHTML = legendInfo;

//     grades.forEach(function(grade, index) {
//       labels.push("<li style=\"background-color: " + grades[index] + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding legend to the map
//   legend.addTo(myMap);


});

//+ labels.join("")
// function createFeatures(earthquakeData) {
//     //console.log(earthquakeData);
//     // Define a function we want to run once for each feature in the features array
//     // Give each feature a popup describing the place and time of the earthquake
//     function onEachFeature(feature, layer) {
//       layer.bindPopup("<h3>" + feature.properties.place +
//         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");


//     }
   




//     // Create a GeoJSON layer containing the features array on the earthquakeData object
//     // Run the onEachFeature function once for each piece of data in the array
//     var earthquakes = L.geoJSON(earthquakeData, {
//       onEachFeature: onEachFeature
//     });
//     console.log(earthquakes);
//     // Sending our earthquakes layer to the createMap function
//     createMap(earthquakes);
//   }

// // Initialize an object containing icons for each layer group
// // var icons = {
// //     Magnitude_small: L.ExtraMarkers.icon({
// //       icon: "ion-settings",
// //       iconSize:  [38, 38],
// //       iconColor: "white",
// //       markerColor: "blue-dark",
// //       shape: "star"
// //       fillOpacity:opacityMarker
// //     }),
// //     Magnitude_medium: L.ExtraMarkers.icon({
// //       icon: "ion-settings",
// //       iconSize:  [58, 58],
// //       iconColor: "white",
// //       markerColor: "blue-dark",
// //       shape: "star"
// //       fillOpacity:opacityMarker
// //     }),
// //     Magnitude_large: L.ExtraMarkers.icon({
// //       icon: "ion-settings",
// //       iconSize:  [78, 78],
// //       iconColor: "white",
// //       markerColor: "blue-dark",
// //       shape: "star",
// //       fillOpacity:opacityMarker
// //     }),
    
// //   };
// function createMap(earthquakes) {

//     //layers: [streetmap, earthquakes]
//     // Create the tile layer that will be the background of our map
// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
//     })//.addTo(myMap);

//     // Create a baseMaps object to hold the lightmap layer
//     var baseMaps = {
//         "Light Map": lightmap
//     };

//     //  Create an overlayMaps object to hold the earthquake layer
//     var overlayMaps = {
//         "earthquakes": earthquakes
//     };

  
//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     var myMap = L.map("map", {
//         center: [
//         37.09, -95.71
//         ],
//         zoom: 5,
//         layers: [lightmap, earthquakes]
//     });
   

//         //var depthQuake = features.geometry.coordinates[2];

//         // for (var i = 0; i < depthQuake.length; i++) {
//         //     var depth = Object.assign({}, depthQuake[i]);

//         //         if (depth < 50 ) {
//         //             opacityMarker = .25;
//         //           }
//         //         else if (depth >= 50 & depth < 150) {
//         //             opacityMarker = .50;
//         //         }
//         //         else if (depth >= 150 & depth < 350) {
//         //             opacityMarker = .75;
//         //         } 
//         //         else opacityMarker = 1;   

//         // };
            
//         // Create a layer control
//     // Pass in our baseMaps and overlayMaps
//     // Add the layer control to the map
//     // L.control.layers(baseMaps, overlayMaps, {
//     //     collapsed: false
//     // }).addTo(myMap);
// }

// // Create a new marker
// // Pass in some initial options, and then add it to the map using the addTo method
// // var marker = L.marker([45.52, -122.67], {
// //     draggable: true,
// //     title: "My First Marker"
// //   }).addTo(myMap);
  
// //   // Binding a pop-up to our marker
// //   marker.bindPopup("Hello There!");






// // var myMap = L.map("map", {
// //     center: [45.52, -122.67],
// //     zoom: 13
// //   });
  
// //   // Adding a tile layer (the background map image) to our map
// //   // We use the addTo method to add objects to our map
// //   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
// //     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
// //     tileSize: 512,
// //     maxZoom: 18,
// //     zoomOffset: -1,
// //     id: "mapbox/streets-v11",
// //     accessToken: API_KEY
// //   }).addTo(myMap);
  
