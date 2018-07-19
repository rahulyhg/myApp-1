function start(){
    console.log('starting...................................');
    console.log('starting ajax call.........................');
    var lsLat = "36.7201600";
    var lsLong = "-4.4203400";
    var lsDate = "today";
    $.get("https://api.sunrise-sunset.org/json?lat=" + lsLat + "&lng=" + lsLong + "&date=today").done(function(response){
        var args = arguments;
        console.log(args);
        var lssunrise = args[0].results.sunrise;
        var lssunset = args[0].results.sunset;
        $(".riseText").append(" " + lssunrise);
        $(".setText").append(" " + lssunset);
    });
    $("#results").removeAttr("style");
    console.log('did it work?...............................');
}

function hideData(){
    $("#results").attr("style", "display:none");
}