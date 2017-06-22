/*
 * Central repository of options to change when forking this map!
 */

var config = {
	//Set Map Bounds & point map is centered around
	mapFocus : [41.68932225997044, -88.11035156249999],
	south : 36.73888412439431 ,
	west :  -91.7138671875,
	north : 42.71473218539458,
	east : -87.1875,
	//Mapbox access token & key for basemap
	mapboxAccessToken :
            'pk.eyJ1IjoiZWFzaGVybWEiLCJhIjoiY2oxcW51Nzk2MDBkbTJxcGUxdm85bW5xayJ9.7mL0wQ7cjifWwt5DrXMuJA',
    //Change to your username, insert function on cartodb, and cartodb tablename (see also /cartoDB_functions)
	cartoDBusername : 'easherma',
	cartoDBinsertfunction : 'insert_bikeways_data',
	walkthroughWelcome: "<p>This webmap allows you to submit input on where critical rural freight coordiors can be improved by drawing on the map. It also allows you to view relevant data we have collected.</p>",
    routesDialog: "<br>Routes can indicate a critical coordior or problem stretch of road... Click to add points to form a route. Double click on the final point to end that route, and then write a description. You are welcome to input as many routes as you please",
    pointsDialog: "<br>Tell us about critical facilities, problem areas, or other location-based issues. When you click 'Save Input' your marker and description are sent to our database."
};
