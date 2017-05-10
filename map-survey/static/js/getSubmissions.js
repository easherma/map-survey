// var sql = new cartodb.SQL({ user: 'easherma',format: 'geoJSON'});
// sql.execute("SELECT * FROM bikeways")
//   .done(function(data) {
//       console.log(data);
//     L.geoJson(data).addTo(map);
//   })
//   .error(function(errors) {
//     // errors contains a list of errors
//     console.log("errors:" + errors);
//   })
//



var sql_statement='select the_geom, description, email, name, org, insert_time from bikeways';

//   $.getJSON('https://easherma.carto.com/api/v2/sql/?format=GeoJSON&q='+sql_statement, function(data) {
// L.geoJson(data).addTo(map);
//   });




  $.ajax({
    type: 'GET',
    url: 'https://'+config.cartoDBusername+'.carto.com/api/v2/sql/?format=GeoJSON',
    crossDomain: true,
    data: {"q":sql_statement},
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
      console.log("Data retrived");
      console.log(responseData);
      var submissionsStyle = L.geoJson(responseData, {
          onEachFeature: onEachFeature
      })
      layerOrder[layerOrder.length] = submissionsStyle;
      feature_group.addLayer(submissionsStyle).addTo(submissions);

    },
    error: function (responseData, textStatus, errorThrown) {
        console.log(responseData);

        console.log("Problem getting the data");
    }
  });
