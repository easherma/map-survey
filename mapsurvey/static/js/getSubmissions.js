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

$.ajax({
  type: 'GET',
  url: 'https://api.osgisomg.com/api/data/',
  crossDomain: true,
  // data: {"q":sql_statement},
  dataType: 'json',
  contentType: 'application/json; charset=utf-8',
  success: function(responseData, textStatus, jqXHR) {
    console.log("Submissions retrived");
    console.log(JSON.stringify(responseData));
    var submissionsStyle = L.geoJson(responseData, {
        onEachFeature: onEachFeature
    })
    layerOrder[layerOrder.length] = submissionsStyle;
    feature_group.addLayer(submissionsStyle).addTo(submissions);

  },
  error: function (responseData, textStatus, errorThrown) {
      console.log(JSON.stringify(responseData));
      console.log("Problem retriving submissions");
  }
});


var sql_statement='select the_geom, description, email, name, org, insert_time from bikeways';

//old query for carto

  $.getJSON('https://easherma.carto.com/api/v2/sql/?format=GeoJSON&q='+sql_statement, function(data) {
L.geoJson(data).addTo(map);
  });
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
