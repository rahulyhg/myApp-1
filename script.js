function start(){
    console.log('starting...................................');
    console.log('starting ajax call.........................');
    
    /*$.get("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today").done(function(response){
        console.log(arguments);
    });*/
    $("#results").removeAttr("style");
    console.log('did it work?...............................');
}

function hideData(){
    $("#results").attr("style", "display:none");
}