/*  QGIS layer*/

//generic code to append all attributes of a feature to a pop-up

function onEachFeature(feature, layer) {
    // if (feature.properties && feature.properties.name)
    {
        var popupContent = '<table>';
        for (var p in feature.properties) {
            popupContent += '<tr><td>' + p + ':</td><td><b>' + feature.properties[p] + '</b></td></tr>';
        }
        popupContent += '</table>';
        layer.bindPopup(popupContent);
    }
}

function onEachFeatureFreight(feature, layer) {
    // if (feature.properties && feature.properties.name)
    {
        var popupContent = '<table>';
            popupContent += '<tr><td>' + "AADTT" + ':</td><td><b>' + feature.properties['AADTT'] + '</b></td></tr>';
        popupContent += '</table>';
        // layer.bindPopup(popupContent);

                layer.bindPopup(popupContent, {closeButton: false, offset: L.point(0, -20)});
                layer.on('mouseover', function() { layer.openPopup(); });
                layer.on('mouseout', function() { layer.closePopup(); });
    }
}

function onEachFeatureIntermodalConn(feature, layer) {
    // if (feature.properties && feature.properties.name)
    {
        var popupContent = '<table>';
            popupContent += '<tr><td>' + "" + ':</td><td><b>' + feature.properties['CONN_DES'] + '</b></td></tr>';
        popupContent += '</table>';
        layer.bindPopup(popupContent);

                // layer.bindPopup(popupContent, {closeButton: false, offset: L.point(0, -20)});
                // layer.on('mouseover', function() { layer.openPopup(); });
                // layer.on('mouseout', function() { layer.closePopup(); });
    }
}

function onEachFeatureRpa(feature, layer) {
    // if (feature.properties && feature.properties.name)
    {
        var popupContent = '<table>';
            popupContent += '<tr><td>' + "" + ':</td><td><b>' + feature.properties['rpa'] + '</b></td></tr>';
        popupContent += '</table>';
        layer.bindPopup(popupContent);

                // layer.bindPopup(popupContent, {closeButton: false, offset: L.point(0, -20)});
                // layer.on('mouseover', function() { layer.openPopup(); });
                // layer.on('mouseout', function() { layer.closePopup(); });
    }
}


  var layerOrder = new Array();
  var feature_group = new L.featureGroup([]);

  function styleNhfn(feature) {
      if (feature.properties.NHFN == "PHFS") {
          return {
                              color: '#5ab4ac',
                              weight: '2',
                              opacity: '1.0',

          }
      }
      if (feature.properties.NHFN == "NON_PHFS_IS") {
          return {
                              color: '#d8b365',
                              weight: '2',
                              opacity: '1.0',

          }
      }
  }

  var intermodalStyle = L.geoJson(intermodal_conn, {
      onEachFeature: onEachFeatureIntermodalConn
  });

  layerOrder[layerOrder.length] = intermodalStyle;
  feature_group.addLayer(intermodalStyle);

  var rpaStyle = L.geoJson(rpa_diss, {

      onEachFeature: onEachFeatureRpa,
      style: {
          color: '#999999',
          weight: '2',
          opacity: '.5',

      },
      interactive :true,
      pane: 'shadowPane',
  });

  layerOrder[layerOrder.length] = rpaStyle;
  feature_group.addLayer(rpaStyle);

var selected

  var freightStyle = new L.geoJson(nhfn, {
      style: styleNhfn,
      onEachFeature: onEachFeatureFreight,
      interactive :false,
      pane: 'shadowPane'
  }).on('mouseover', function (e) {
      // Check for selected
      if (selected) {
        // Reset selected to default style
        e.target.resetStyle(selected)

      }
      // Assign new selected
      selected = e.layer
      // Bring selected to front
      selected.bringToFront()
      // Style selected
      selected.setStyle({
        'color': 'red'
      })
    });
layerOrder[layerOrder.length] = freightStyle;
feature_group.addLayer(freightStyle);

function styleCounties(feature){
    return {
                        color: '#999999',
                        weight: '2',
                        opacity: '.5',
                        fill: false,

    }
}
var countiesStyle = new L.geoJson(counties, {
    style: styleCounties
    ,clickable :false
    ,pane: 'shadowPane'
});
layerOrder[layerOrder.length] = countiesStyle;
feature_group.addLayer(countiesStyle);
  //
  //
  // function doStylebikefacilities(feature) {
  //         if (feature.properties.BikeFacili >= 1.0 &&
  //                 feature.properties.BikeFacili <= 1.8) {
  //
  //             return {
  //                 color: '#006837',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  //         if (feature.properties.BikeFacili >= 1.8 &&
  //                 feature.properties.BikeFacili <= 2.6) {
  //
  //             return {
  //                 color: '#984ea3',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  //         if (feature.properties.BikeFacili >= 2.6 &&
  //                 feature.properties.BikeFacili <= 3.4) {
  //
  //             return {
  //                 color: '#78c679',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  //         if (feature.properties.BikeFacili >= 3.4 &&
  //                 feature.properties.BikeFacili <= 4.2) {
  //
  //             return {
  //                 color: '#c2e699',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  //         if (feature.properties.BikeFacili >= 4.2 &&
  //                 feature.properties.BikeFacili <= 5.0) {
  //
  //             return {
  //                 color: '#ffff99',
  //                 weight: '3.44',
  //                 opacity: '1.0',
  //             }
  //         }
  // }
  //     var json_bikefacilitiesJSON = new L.geoJson(json_bikefacilitiesexp, {
  //         style: doStylebikefacilities
  //         ,clickable :false
  //         ,pane: 'shadowPane'
  //     });
  // layerOrder[layerOrder.length] = json_bikefacilitiesJSON;
  // feature_group.addLayer(json_bikefacilitiesJSON);
