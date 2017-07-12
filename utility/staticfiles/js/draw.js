            //Empty to store drawn routes after they are submitted
        var submittedRoutes = new L.geoJson(false, {
            onEachFeature: function (feature, layer) {
              layer.bindPopup('<b>'+feature.properties.name +', '+ feature.properties.password +'</b><br>'                               +feature.properties.description +'');
            }
            ,style: function(feature){
                /* Styles the submitted route drawing with the same properties as the drawn route as defined by line(id)  in definitions.js */
                        return{
                            color:feature.properties.color,
                            weight: feature.properties.weight,
                            opacity: feature.properties.opacity
                        }
                    }
          }).addTo(map);
        var drawnMarkers = new L.FeatureGroup();
		map.addLayer(drawnMarkers);
        var drawnRoute = new L.FeatureGroup();

        var drawControl = new L.Control.Draw({
          draw : {
            polygon : false,
            polyline : false,
            rectangle : false,
            circle : false
          },
          edit : false,
          remove: false
        });

        markerDrawer =  new L.Draw.Marker(map, drawControl.options.marker);

        map.on('draw:created', function (e) {
            var layer = e.layer;
            drawnMarkers.addLayer(layer);
            dialog.dialog( "open" );
        });

		 	/*#left-bar buttons*/
        /* button that triggers adding a marker */
        $("#add-point").on("click", function(event){
			event.stopPropagation();
			if(validInput===false){
				dialogGlobal.data('clicked','add-point').dialog( "open" );
            }
            else if(validInput){
				drawingPoints();
			}
        });

		/* button that triggers drawing a route */
        $("#add-route").on("click", function(event) {
			event.stopPropagation();
            if(validInput===false){
				dialogGlobal.data('clicked','add-route').dialog( "open" );
			}
            else if(validInput){
				drawingRoute();
            }
        });
		/*Button that triggers the initial walkthrough again*/
		$("#about").on("click", function(event){
			event.stopPropagation();
		     $.prompt(tourStates,{zIndex: 1200});
		});

		$("#cancel").on("click", function(event){
			event.stopPropagation();
			if(routeDraw){
                cancelLine();
            }
            else if (markerDraw){
                markerDrawer.disable();
            };
            refreshLayer();
            $("#add-route").removeClass('icon-click');
            $("#add-point").removeClass('icon-click');
            markerDraw = false; routeDraw = false;
			$("#cancel").hide();
			$("#save").hide();
		});

		$("#save").on("click", function(event){
			event.stopPropagation();
			dialog.dialog("open");
		});
		//Only show when drawing happens
		$("#cancel").hide();
		$("#save").hide();

		/*End #left-bar buttons*/




	//Functions to initiate drawing
	function drawingRoute(){
		$("#add-route").addClass('icon-click');
		$("#add-point").removeClass('icon-click');
		$("#cancel").show();
		markerDrawer.disable();
		refreshLayer();
		routeDraw = true;
		markerDraw = false;
		currentLine = startNewLine(routeNum);
		map.addLayer(drawnRoute);
		drawnRoute.addLayer(currentLine.polyline);
	}
	function drawingPoints(){
		if(routeDraw){
			cancelLine();
			refreshLayer();
			routeDraw = false;
			$("#add-route").removeClass('icon-click');
			$("#save").hide();
		};
		$("#add-point").addClass('icon-click');
		$("#cancel").show();
		markerDrawer.enable();
		markerDraw = true;
	}

	function stopDrawingPoints(){
		$("#add-point").removeClass('icon-click');
		$("#cancel").hide();
		markerDrawer.disable();
		markerDraw = false;
	}

    function setData() {
      var enteredDescription = "'"+description.value+"'";
      var enteredEmail = "'"+email.value+"'";
      var enteredOrgname = "'"+orgname.value+"'";
    //Convert the drawing to a GeoJSON to pass to the CartoDB sql database

      var drawing = "";
        if(routeDraw){
            var submittedLine = currentLine.polyline.toGeoJSON();

            drawing = "'"+JSON.stringify(submittedLine.geometry)+"'";

            //To ensure that drawn routes remain on map after saving, with popup.

            submittedLine.properties.description = description.value;
            submittedLine.properties.name = username.value;
            // submittedLine.properties.password = password.value;
            submittedLine.properties.email = email.value;
            submittedLine.properties.orgname = orgname.value;
            submittedLine.properties.color = currentLine.polyline.options.color;
            submittedLine.properties.weight = currentLine.polyline.options.weight;
            submittedLine.properties.opacity= currentLine.polyline.options.opacity;

            submittedRoutes.addData(submittedLine);

            routeNum ++;
			stopRouteDraw();
			$("#cancel").hide();
			$("#save").hide();
		};
        if(markerDraw){
            drawnMarkers.eachLayer(function (layer) {
                //Convert the drawing to a GeoJSON to pass to the CartoDB sql database
                var newData = layer.toGeoJSON();
                drawing = "'"+JSON.stringify(newData.geometry)+"'";

                // Transfer drawing to the CartoDB layer
                  newData.properties.description = description.value;
                  newData.properties.name = username.value;
                //   newData.properties.password = password;
                  newData.properties.email = email.value;
                  newData.properties.orgname = orgname.value;
                submittedData.addData(newData);
            });
			stopDrawingPoints();

        };

        refreshLayer();
        //Ensures that drawn routes stay on the map.
        if(routeDraw){submittedRoutes.eachLayer( function(layer){layer.addTo(map);});};
      //Construct the SQL query to insert data from the three parameters: the drawing, the input username, and the input description of the drawn shape
      var sql = "SELECT "+ config.cartoDBinsertfunction +"(";
      sql += drawing;
      sql += ","+enteredDescription;
      sql += ","+enteredUsername;
    //   sql += ","+password;
      sql += ","+enteredEmail;
      sql += ","+enteredOrgname+");";

//        console.log(sql); //For testing

    //Sending the data
      $.ajax({
        type: 'POST',
        url: 'https://'+config.cartoDBusername+'.carto.com/api/v2/sql',
        crossDomain: true,
        data: {"q":sql},
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) {
          console.log("Data saved");


        },
        error: function (responseData, textStatus, errorThrown) {
            console.log(responseData);
            console.log(sql);
            console.log("Problem saving the data");
        }
      });

        dialog.dialog("close");
    };


    function refreshLayer() {

        if(markerDraw){
            map.removeLayer(drawnMarkers);
            drawnMarkers = new L.FeatureGroup();
        }else if(routeDraw){
            map.removeLayer(drawnRoute);
            drawnRoute = new L.FeatureGroup();
        }
    };
