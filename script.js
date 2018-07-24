window.onload = Init;

function Init(){
    //logic to be executed when the page loads goes here...
    document.getElementById("location").value = "";
}

$(document).ready(function(){
    $("#moreInfo").hide();
    $("#read-less").hide();
    //console.log($("#read-type").text().indexOf("Read More") != -1);
});

function toggleInfo(id){
    //toggles read-more read-less functionality
    if(id=='read-more'){
        $("#read-more").hide();
        $("#moreInfo").show();
        $("#read-less").show();
    }
    else if(id == 'read-less'){
        $("#read-more").show();
        $("#moreInfo").hide();
        $("#read-less").hide();
    }
}

function hideData(){
    document.getElementById("location").value = "";
    $("#results").attr("style", "display:none");
}

function initialize(){
    console.log('To better understand the flow type:');
    console.log('document.enhancedDebugging = "Y"');
    console.log('and then start the process');

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById("location"));
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
        $(".loader").removeAttr("style");
        enhancedDebugging("You have enabled the enhanced debugging");
        enhancedDebugging("showing loading animation");
        enhancedDebugging("fetching place");
        var place = autocomplete.getPlace();
        enhancedDebugging("fetching latitude and longitude of the place");
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        enhancedDebugging("latitude = " + lat);
        enhancedDebugging("longitude = " + lng);
        enhancedDebugging("fetching Google's Timezone API");
        start(lat, lng);
    });
}

function start(lat, lng){
    enhancedDebugging("calling API......");

    $.get("https://maps.googleapis.com/maps/api/timezone/json?location="+lat+","+lng+"&timestamp=1532306358&key=AIzaSyBp4DVGS0_e1EF41Nmh7swrmvxQss5UnlM").done(
        function(){
            enhancedDebugging("API responded....");
            enhancedDebugging("calculating offset....");
            tzDetails = arguments;
            offset = tzDetails[0].dstOffset + tzDetails[0].rawOffset;
            enhancedDebugging("offset = " +offset);
            enhancedDebugging("ending API call....");
            enhancedDebugging("fetching FCC Weather API");
            calculateTimes(offset, lat, lng);
        }
    )
}

function calculateTimes(offset, lat, lng){
    enhancedDebugging("calling API....");

    $.get("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lng).done(
        function(){
            enhancedDebugging("API responded....");
            enhancedDebugging("fetching UTC time for sunrise sunset....");
            timeDetails = arguments;
            enhancedDebugging("adjusting for offset....");
            sunrise = timeDetails[0].sys.sunrise + offset;
            sunset = timeDetails[0].sys.sunset + offset;
            enhancedDebugging("converting to human readable form....");
            sunrise = new Date(sunrise*1000).toISOString().slice(-13, -5);
            sunset = new Date(sunset*1000).toISOString().slice(-13, -5);
            enhancedDebugging("sunrise = " + sunrise);
            enhancedDebugging("sunset = " + sunset);
            $(".riseText").replaceWith("<p class = 'riseText'>Sunrise Time: " + sunrise+"</p>");
            $(".setText").replaceWith("<p class = 'setText'>Sunset Time: " + sunset+"</p>");
        }
    );
    enhancedDebugging("commencing UI changes");
    $(".loader").attr("style", "display:none");
    $("#results").removeAttr("style");
}

function enhancedDebugging(msg){
    //to enable enhancedDebugging go to console and type
    //document.enhancedDebugging = "Y"
    if(document.enhancedDebugging == "Y"){
        console.log(msg);
    }
}
