// Creating map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
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
  // Once we get a response, send the data.features object to the createFeatures function.
  //createFeatures(data.features);

  // Create three function. One to calculate radius, one for the other color and third for the magnitude.

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
            layer.bindPopup("<h3>" + "Magnitude " + feature.properties.mag + //+ geometry.point.coordinates[2]+//
        "</h3><hr><p>" + feature.properties.place + "</p>");
        }
    }).addTo(myMap)


    // Lets add the legends
    var legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        labels = ['<strong>Earthquake Magnitude</strong>'],
        grades = ['0-1', '1-2', '2-3', '3-4', '4-5', '5+'];
        colors = ["white","#FFFC33","#6495ed","#90ee90","#ff8c00","#ff0000"];
        

        for (var i = 0; i < colors.length; i++) {
            div.innerHTML += 
            labels.push(
            '<i id = "circle" style = "background:'+ colors[i] + '"></i> ' +
            (grades[i] ? grades[i] : '+'));
        }
         div.innerHTML = labels.join('<br>');
        
        return div;


    };
    
    legend.addTo(myMap)

});

