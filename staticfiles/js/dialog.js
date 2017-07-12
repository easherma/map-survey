//Dialog of global user variables
dialogGlobal = $( "#dialogGlobal" ).dialog({
      autoOpen: false,
      height: 550,
      width: 450,
      modal: true,
    position: {
        my: "center center",
        at: "center center",
        of: "#map"
      },
  buttons: [{
    text: "Submit",
      click: function() {
        var checkedValues = dialogGlobalChecker(username.value);
        if (checkedValues.valid){
            // password = "'"+password.value+"'";
            enteredUsername = "'"+username.value+"'";

            dialogGlobal.dialog("close");
            validInput = true;
            if($(this).data('clicked')=='add-route'){
                drawingRoute();
            }
            else if($(this).data('clicked')=='add-point'){
                drawingPoints();
            }
        }
        else{
            validInput = false;
            var index;
            for(index = 0; index < checkedValues.error.length; ++index){
                alert(checkedValues.error[index]);
            }
        }
    },
    id: "globalAccept"
  }],
  close: function() {

  },
    //Hack to avoid "ENTER" leading to a new page...
    open: function(){
        $("#dialogGlobal").keydown(function(e) {
          if (e.keyCode == $.ui.keyCode.ENTER) {
            $("#globalAccept").trigger("click");
          }
        });

    }
});

$("#globalAccept").on("touchstart", function() {
        var checkedValues = dialogGlobalChecker(username.value);
        if (checkedValues.valid){
            // password = "'"+password.value+"'";
            enteredUsername = "'"+username.value+"'";

            dialogGlobal.dialog("close");
            validInput = true;
            if($(this).data('clicked')=='add-route'){
                drawingRoute();
            }
            else if($(this).data('clicked')=='add-point'){
                drawingPoints();
            }
        }
        else{
            validInput = false;
            var index;
            for(index = 0; index < checkedValues.error.length; ++index){
                alert(checkedValues.error[index]);
            }
        }
    });


/* dialog that appears after finishing a drawing */
dialog = $( "#dialog" ).dialog({
  autoOpen: false,
  height: 300,
  width: 350,
  modal: true,
  position: {
    my: "center center",
    at: "center center",
    of: "#map"
},
  buttons: [{
      text: "Save Input",
      click : function(){
        setData();
      },
      id: "dialogSaveInput"
  },
      {text: "Cancel",
      click: function() {
        if(markerDraw){
            refreshLayer();
            markerDrawer.enable();
        }
        dialog.dialog("close");
    }
  }],
  close: function() {
    if(markerDraw){
            refreshLayer();
            markerDrawer.enable();
    }

  }
  , open: function() {
      var _title = "Tell us about this";
      if (markerDraw){
          _title += " location";
      }
      else if (routeDraw){
          _title += " route";
      }
      $( "#dialog" ).dialog( "option", "title",_title);
      $( "#dialog" ).keydown(function(e) {
              if (e.keyCode == $.ui.keyCode.ENTER) {
                $("#dialogSaveInput").trigger("click");
              }
            });

  }
});

function dialogGlobalChecker(name) {
    var error = [];
    var valid = true;
    if(name.length < 3) {
        error.push("Your name is too short.");
        valid = false;
    }
    // if(password.length < 5){
    //     error.push("Your password is too short.");
    //     valid = false;
    // }else if(!/(^\d{5}$)/.test(password)){
    //     error.push("Your password is invalid.");
    //     valid = false;
    // }
    return {valid: valid, error: error};
}


$(".ui-front").css('z-index','1005');

/* Impromptu dialogs */
var tourSubmitFunc = function(e,v,m,f){
    if(v === -1){
        $.prompt.prevState();
        return false;
    }
    else if(v === 1){
        $.prompt.nextState();
        return false;
    }
    else if(v === 0){
        $.prompt.close();
        return false;
    }
},
tourStates = [
   {
       title: "Welcome!",
       html:  "<div class = 'img-container' style='width:50%;height:50%;' ><img src='img/IDOT.jpg' style='width:90%;height:90%;'></div><div class = 'img-container' style='width:50%;height:50%;'><img src='img/ilsoy.jpg' style='width:90%;height:90%;'></div>" + config.walkthroughWelcome,
       buttons:{'I already know':0,'How do I use this?':1},
       focus: 1,
       submit: tourSubmitFunc
   },
    {
        title:"Data Layers",
        html:"Here you have the legend for the datalayers, you can toggle each layer by clicking on the check    mark",
        buttons:{'Go back':-1,'I\'m done':0,'Tell me more!':1},
        focus:2,
        position: { container: '.leaflet-control-layers-expanded', x: -330, y: 0, width: 300, arrow: 'rt' },
        submit:tourSubmitFunc
    },
    {
        title:"Enable Drawing",
        html:"Click on either <span class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-map-marker fa-inverse fa-stack-1x'></i></span> or <span class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-pencil fa-inverse fa-stack-1x'></i></span> to start giving your input. First we'll want you to enter some identifying information.<br> After that you'll be able to add your input to the map!",
        buttons:{'Go back':-1,'I\'m done':0,'Tell me more!':1},
        position: { container: '#leftBar', x: 150, y: 0, width: 300, arrow: 'lt' },
        focus:2,
        submit:tourSubmitFunc
    },
    {
        title:"Click on <span class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-map-marker fa-inverse fa-stack-1x'></i></span> and Place a Marker on the Map",
        html:"<div class = 'img-container'><img src='img/add_marker.gif'></div>" +  config.pointsDialog,
        buttons:{'Go back':-1,'I\'m done':0,'Tell me more!':1},
        position:{width:500},
        focus:2,
        submit:tourSubmitFunc
    },
    {
        title:"Or Click on <span class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-pencil fa-inverse fa-stack-1x'></i></span> to Draw a Route",
        html:"<div class = 'img-container'><img src='img/draw_route.gif'></div>"+ config.routesDialog,
        buttons:{'Go back':-1,'I\'m ready!':0},
        position:{width:500},
        focus:1,
        submit:tourSubmitFunc
    }
 ];

if (deviceIsMobile) {
  tourStates = [
      {
        title:"Click on <span class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-pencil fa-inverse fa-stack-1x'></i></span> to Draw a Route",
        html:"<div class = 'img-container'><img src='img/draw_route.gif'></div><br>Click to add points to form a route. Double click on the final point to end that route, and then write a description.",
        buttons:{'I already know':0,'Tell me more':1},
        focus:1,
        submit:tourSubmitFunc
    },
    {
        title:"Click on <span class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-map-marker fa-inverse fa-stack-1x'></i></span> to Place a Marker",
        html:"<div class = 'img-container'><img src='img/add_marker.gif'></div><br>Tell us about dangerous intersections, potholes, etc. When you click 'Save Input' your marker and description are sent to our database.",
        buttons:{'Go back':-1,'I\'m done':0,'Tell me more!':1},
        focus:2,
        submit:tourSubmitFunc
    },
      {
       title: "More Info",
       html: "<div class = 'img-container'><img src='img/IDOT.jpg'></div>" + config.walkthroughWelcome,
       buttons:{'Go back':-1,'I\'m ready!':0},
       focus: 1,
       submit: tourSubmitFunc
   }
  ]
}


$.prompt(tourStates, {zIndex: 1200});
