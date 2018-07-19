function start(){
    //console.log('starting...................................');
    //console.log('starting ajax call.........................');
    var lsLat = "36.7201600";
    var lsLong = "-4.4203400";
    var lsDate = "today";
    $.get("https://api.sunrise-sunset.org/json?lat=" + lsLat + "&lng=" + lsLong + "&date=today").done(function(response){
        var args = arguments;
        //console.log(args);
        var lssunrise = args[0].results.sunrise;
        var lssunset = args[0].results.sunset;
        $(".riseText").replaceWith("<p class = 'riseText'>Sunrise Time: " + lssunrise+"</p>");
        $(".setText").replaceWith("<p class = 'setText'>Sunset Time: " + lssunset+"</p>");
    });
    $("#results").removeAttr("style");
    //console.log('did it work?...............................');
}

function hideData(){
    $(".riseText").replaceWith("<p class='riseText'>Sunrise Time:</p>");
    $(".setText").replaceWith("<p class='riseText'>Sunset Time:</p>");
    $("#results").attr("style", "display:none");
}