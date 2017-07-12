var layerOrder = new Array();
var feature_group = new L.featureGroup([]);



function stackLayers() {
    for (index = 0; index < layerOrder.length; index++) {
        map.removeLayer(layerOrder[index]);
        map.addLayer(layerOrder[index]);
    }
}
function restackLayers() {
    for (index = 0; index < layerOrder.length; index++) {
        layerOrder[index].bringToFront();
    }
}


//L.mapbox.accessToken = config.mapboxAccessToken;
// Create a map in the div #map
		var bounds = L.latLngBounds(L.latLng(config.south,config.west), L.latLng(config.north,config.east));
        var map = L.map('map', {
            center: config.mapFocus,
            zoom: 7,
            minZoom : 7,
            maxzoom: 19,
            maxBounds : (bounds.pad(1)),
            zoomControl :false
        });
        map.touchZoom.enable();
        L.control.zoom({position : 'bottomleft'}).addTo(map);

        //Positron basemap
        var CartoDB_PositronNoLabels = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
            maxZoom: 19
        });

        var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        CartoDB_PositronNoLabels.addTo(map);

        // Esri_WorldImagery.addTo(map);

        //Bug appeared preventing ending of route drawing.
		map.doubleClickZoom.disable();
//		Do nothing on right-click
		map.on('contextmenu', []);

		//Adding the left Bar of icons as a leaflet control panel
		var leftBar = L.control({position: 'topleft'});

		//Inspiration: http://stackoverflow.com/a/25764322/4047679
		//More insiration: http://stackoverflow.com/questions/18673860/defining-a-html-template-to-append-using-jquery

		var hiddenInteractionButtonsTemplate = $('#hidden-interaction-buttons-template').html();

		leftBar.onAdd = function(map){
			var div =L.DomUtil.create('div', '');
			div.id = 'leftBar';
			div.innerHTML = hiddenInteractionButtonsTemplate;
			return div;
		};

		leftBar.addTo(map);


		//Adding layer of labels
		var labelLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png', {
            "attribution": '&copy; <a href="https://carto.com/attribution">CARTO</a>',
            "maxzoom": 17,
        	"minzoom": 13,
            "pane":"markerPane"}).addTo(map);
//		markerPane.appendChild(labelLayer.getContainer());
		//See for explanation of zindex level http://stackoverflow.com/q/35092858/4047679
//		labelLayer.setZIndex(5);

map.on('overlayadd', restackLayers);
layerControl = L.control.layers({},{},{collapsed:false});

//Empty to store markers after they are submitted
var submittedData = L.geoJson(false, {
onEachFeature: function (feature, layer) {
  layer.bindPopup('<b>'+feature.properties.name +', '+ feature.properties.password +'</b><br>'                               +feature.properties.description +'');
}
}).addTo(map);

var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

var boundaries = new L.LayerGroup();

var urban = new L.LayerGroup();

var mpo = new L.LayerGroup();

var gai = new L.LayerGroup();

var counts = new L.LayerGroup();

var freight = new L.LayerGroup();

var intermodal_legend = new L.LayerGroup();

var submissions = new L.LayerGroup();

var majorports = new L.LayerGroup();
var minorports = new L.LayerGroup();

// L.geoJSON(counties).addTo(boundaries);

// L.geoJSON(nhfn).addTo(freight);


  // L.esri.basemapLayer("Topographic").addTo(map);
// L.esri.featureLayer({
// url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_boundaries/MapServer/5',
// opacity: 0.7,
// useCors: true,
// simplifyFactor: 1,
// precision: 5,
// layers: [5]
// }).addTo(gai);

// L.esri.featureLayer({
// url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_designatedtruckroutes/MapServer/2',
// opacity: 0.7,
// useCors: true,
// simplifyFactor: 1,
// precision: 5,
// layers: [0,1,2,3,4]
// }).addTo(gai);

var intermodal = L.esri.featureLayer({
url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/IntermodalFreightFacilities/MapServer/0',
where: "STATE='IL'",
pane: 'shadowPane'
}).addTo(intermodal_legend);

var intermodalPopup = "<p>{NAME}<br></p><table><tr><th>Type</th><th>Mode Type</th><th>Association</th></tr><tr><td>{TYPE}</td><td>{MODE_TYPE}</td><td>{ASSOC}</td></tr></table>"
intermodal.bindPopup(function (layer) {
  return L.Util.template(intermodalPopup, layer.feature.properties);
});

L.esri.dynamicMapLayer({
url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_trafficCount/MapServer/',
opacity: 0.7,
useCors: true,
simplifyFactor: 1,

precision: 5,
layers: [0,1]
}).addTo(counts);

var basemaps = {
    "Grayscale Basemap" : CartoDB_PositronNoLabels,
    "Physical Basemap (Satellite)" : Esri_WorldImagery,
    // "labels" : labelLayer
}

var overlays = {
// "labels": labelLayer,
"Counties": countiesStyle,
"Planning Agencies": rpaStyle,
"MPOs": mpo,
// "gai features": gai,
"Military Bases": militaryStyle,
"Urban Areas": urbanStyle,
"National Highway Freight Network": freightStyle.addTo(map),
"Intermodal Connectors": intermodalStyle,
"Intermodal Facilities": intermodalpointsStyle,
"Submissions": submissions,
"Major Ports": majorports,
"Minor Ports": minorports
};

// boundaries.addTo(map);



//query mpo service, just in bounds
var mpoQuery = L.esri.query({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/MetropolitanPlanningOrganizations/MapServer/0',
    useCors: false,
    pane: 'shadowPane',
    // where: "STATE IN('IL')",
    // layerDefs: {0: "STFIPS='17'"}
});

mpoQuery.within(bounds);

mpoQuery.run(function(error, featureCollection, response){
    L.geoJSON(featureCollection , { onEachFeature: onEachFeatureMPO}).addTo(mpo);
});

var majorPortQuery = L.esri.query({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/Ports_Major/MapServer/0',
    useCors: false,
    // onEachFeature: onEachFeature,
    pane: 'shadowPane',
    // where: "STATE IN('IL')",
    // layerDefs: {0: "STFIPS='17'"}
});

majorPortQuery.within(bounds);

majorPortQuery.run(function(error, featureCollection, response){
    L.geoJSON(featureCollection, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, majorPortMarkerOptions);
            }
    }).addTo(majorports);
});

var minorPortQuery = L.esri.query({
    url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/Ports/MapServer/0',
    useCors: false,
    // onEachFeature: onEachFeature,
    pane: 'shadowPane',
    // where: "STATE IN('IL')",
    // layerDefs: {0: "STFIPS='17'"}
});

minorPortQuery.within(bounds);

minorPortQuery.run(function(error, featureCollection, response){
    L.geoJSON(featureCollection, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, minorPortMarkerOptions);
            }
    }).addTo(minorports);
});


// .addTo(mpo);
//
// var mpoSelect = {};
// mpo.query()
// .within(bounds)
// .run(function(error, featureCollection){
// return mpoSelect = featureCollection;
// console.log(featureCollection);
// });
//
// L.geoJSON(mpoSelect).addTo(mpo);

var mpoPopup = "<p>{MPONAME}<br></p>"
mpo.bindPopup(function (layer) {
  return L.Util.template(mpoPopup, layer.feature.properties);
});

// var portPopup = "<p>{PORT_NAME}<br></p>"
// ports.bindPopup(function (layer) {
//   return L.Util.template(portPopup, layer.feature.properties);
// });

// var urban = L.esri.dynamicMapLayer({
//     url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/UrbanizedAreas/MapServer',
//     useCors: true,
//     layerDefs: {0: "STFIPS1='17'"}
// }).addTo(urban);

// var urban = L.esri.dynamicMapLayer({
//     url: 'https://ags10s1.dot.illinois.gov/ArcGIS/rest/services/GAI/gai_functionalclass/MapServer/1',
//     useCors: true
// }).addTo(gai);

// L.esri.legendControl(ports).addTo(map);

// var urban = L.esri.featureLayer({
// url: 'https://maps.bts.dot.gov/services/rest/services/NTAD/UrbanizedAreas/MapServer',
// opacity: 0.7,
// useCors: true,
// simplifyFactor: 1,
// precision: 5,
// layers: [0]
// }).addTo(map);




var layerControl = new L.control.layers(basemaps, overlays, {collapsed:false}).addTo(map);
layerControl.addTo(map);


		L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
        $(".leaflet-left .leaflet-control-scale").css({"display": "inline-block","float": "none"});
		//http://stackoverflow.com/a/37173967/4047679

        stackLayers();

    var deviceIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

		/*Geolocator, activate only on mobile
		http://stackoverflow.com/a/26577897/4047679*/
		if (deviceIsMobile) {
			L.control.locate({
				position: 'topright',
				icon: 'fa fa-crosshairs',
				locateOptions: {maxZoom: 17}
			}).addTo(map);
		}

var searchControl = L.esri.Geocoding.geosearch({
  providers: [
    arcgisOnline,
    // L.esri.Geocoding.mapServiceProvider({
    //   label: 'States and Counties',
    //   url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
    //   layers: [2, 3],
    //   searchFields: ['NAME', 'STATE_NAME']
    // })
  ]
}).addTo(map);

// .bindPopup(data.results[i].properties.Match_addr).openPopup()
var results = L.layerGroup().addTo(map);

searchControl.on('results', function(data){
  results.clearLayers();
  console.log(data.results[0]);
  for (var i = data.results.length - 1; i >= 0; i--) {
    results.addLayer(L.marker(data.results[i].latlng).bindPopup(data.results[i].properties.Match_addr).openPopup());
  }
});
