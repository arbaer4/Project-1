$(document).ready(function () {

    // init carousel
    $('.carousel').carousel()

    // Reddit Button On Click Event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#start-button").on("click", function () {

        // Ajax Function searching Reddit API for Trashtag, Sorted by newest, Limited to 20 Returns
        $.ajax({
            url: "https://www.reddit.com/search.json?q=trashtag&sort=new&limit=20",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (redditResponse) {
                console.log(redditResponse);

                // For loop to cycle through results
                for (var i = 0; i < 6; i++) {

                    // Variables to be pulled and appended to the page
                    let redditTitle = redditResponse.data.children[i].data.title;
                    let redditImage = redditResponse.data.children[i].data.url;
                    let redditLink = redditResponse.data.children[i].data.permalink;
                    console.log(redditTitle);
                    console.log(redditImage);
                    console.log(redditLink);

                    // Creating Img Tag
                    var redImg = $("<img>");
                    redImg.attr("src", redditImage);

                    // Creating Link Tag
                    var redLink = $("<a>");
                    redLink.attr("href", redditLink);

                    // Appending to the Div
                    $("#content-div").append(redImg);
                    $("#content-div").append(redditTitle);
                    $("#content-div").append(redLink);

                };
            });
    });

    // EventBrite Button On Click Event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#start-button").on("click", function () {
        var ebZip = $("#user-input").val();

        // Ajax Function searching Eventbrite, filtered by Subcategories including Community and Environment, Zip Code used to return results sorted by closest to farthest from the user's Input
        $.ajax({
            url: "https://www.eventbriteapi.com/v3/events/search/?sort_by=-distance&location.address=" + ebZip + "&subcategories=11002%2C1003&token=LDTPIPZLQT2AUI7OBDJJ",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (ebResponse) {
                console.log(ebResponse);

                // For loop to cycle through the Results
                for (var i = 0; i < 6; i++) {

                    // Variables to be pulled and appended to the page
                    let ebTitle = ebResponse.events[i].name.text;
                    let ebSnippet = ebResponse.events[i].description.text;
                    let ebLink = ebResponse.events[i].url;

                    console.log(ebTitle);
                    console.log(ebSnippet);
                    console.log(ebLink);

                    // Creating Link Tag
                    var ebUrl = $("<a>");
                    ebUrl.attr("href", ebLink);

                    // Appending to the Div
                    $("#content-div").append(ebTitle);
                    $("#content-div").append(ebSnippet);
                    $("#content-div").append(ebUrl);
                };
            });
    });

    // OpenWeather On click event
    // TODO: Interaction with what particular responses we want to use from the Object
    // TODO: Include this API Pull with the Eventbrite button event? Pull weather info for the date of the event, in the zip code user provides?
    $("#start-button").on("click", function () {
        var weatherZip = $("#user-input").val();

        // Ajax Function searching Openweather for the current forecast in the zip code of the users input
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + weatherZip + "&appid=37f408cc8e84667b979fff6911c58aa0",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (weatherResponse) {
                console.log(weatherResponse);

                // Variables to be pulled and appended to the page
                let owTemp = (weatherResponse.main.temp - 273.15) * (9 / 5) + 32;
                let owForecast = weatherResponse.weather.main;
                let owRain = weatherResponse.clouds.all;

                console.log(owTemp);
                console.log(owForecast);
                console.log(owRain);
            });
    });

    // NY Times On click event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#start-button").on("click", function () {

        $.ajax({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?&q=nature&sort=newest&api-key=kfv7BnPMd5mvBPeGSaKGQdhyRAGGhhWG",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (nytResponse) {
                console.log(nytResponse);

                // For loop to cycle through the results
                for (var i = 0; i < 11; i++) {

                    // Variables to be pulled and appended to the page
                    let nytSnippet = nytResponse.response.docs[i].headline.main;
                    let nytLead = nytResponse.response.docs[i].lead_paragraph;
                    let nytURL = nytResponse.response.docs[i].web_url;

                    console.log(nytSnippet);
                    console.log(nytLead);
                    console.log(nytURL);

                    // Creating Link Tag
                    let nytLink = $("<a>");
                    nytLink.attr("href", nytURL);

                    // Appending to the Div
                    $("#content-div").append(nytSnippet);
                    $("#content-div").append(nytLead);
                    $("#content-div").append(nytLink);

                }
            });

    });
    //global variables
    //assuming standard plastic water bottle is 12oz size
    var standardBottle = 12;
    var userInput;
    var consumed;
    var numberBottles;
    var plasticSaved;

    //hide times refilled until clicked
    $("#timesrefilled").hide();
    $("#calculatebutton").hide();
    $("#results").hide();
    $("#year").hide();
    $("#refresh").hide();

    //calculating the number of plastic bottles saved by taking the size of the reusable bottle selected, multiplied by the number of times refilled - then dividing that number by 12oz adn rounding it up to give you the number of plastic bottles saved
    $("img").one("click", function () {
        let ounces = parseInt($(this).attr("data"));
        //on click animate the image
        $(this).animate({
            left: '250px',
            height: '+=150px',
            width: '+=150px'
        });
        //on click hide other images
        $(this).siblings("img").hide();
        //on click show input for times refilled
        $("#refresh").show();
        $("#timesrefilled").show();
        $("#calculatebutton").show();
        $("#calculatebutton").on("click", function () {
            //console log the reusable bottle size selected
            console.log("reusable bottle size in oz: ", ounces);
            userInput = $("#amountDrank").val();
            consumed = ounces * userInput;
            //console log total ounces consumed in reusable bottle 
            console.log("total ounces consumed:", consumed);
            numberBottles = consumed / standardBottle;
            //console log unrounded 12 oz bottles saved
            console.log("unrounded number of 12oz plastic bottles: ", numberBottles);
            plasticSaved = Math.ceil(numberBottles);
            //console log rounded up number of plastic bottles saved   
            console.log("number of plastic water bottles to display: " + plasticSaved);
            $("#calculatebutton").hide();
            $("#results").show();
            $("#results").append("You have saved " + plasticSaved + " plastic bottles today");
            for (i = 0; i < plasticSaved; i++) {
                $("#results").append('<img src="Assets/Images/iconfinder_1-43_2029207.png">');
            }
            $("#year").show();
        });
        $("#yearcalc").on("click", function () {
            $("#yearcalc").hide();
            let yearSaved = plasticSaved * 365;
            console.log(yearSaved);
            $("#year").append("At this rate you will save " + yearSaved + " bottles in a year")
            for (i = 0; i < yearSaved; i++) {
                $("#year").append('<img src="Assets/Images/iconfinder_1-43_2029207.png">');
            }

        })

        $("#refresh").click(function () {
            location.reload();
        })
    });



});
/*
    Earth911 API
        earthResponse as function title for pull

        Earth911 API to find local recycling centers. Create inputs to accept type of recycling and zip code
            Type input possibly best off as a dropdown menu, only give the user the options we know will work, otherwise we may end up with a failed search

    Consumption Page
        Alex's Consumption function allowing user to Pick a reusable water bottle size, asks how many times they refill daily, and outputs the plastic consumption.


    Uses for Database/localStorage information
        Possibly useful to save Events from the Eventbrite API
        Maybe have a seperate button and tab where the user can save any Articles, Events or #trashtag posts they enjoy.

*/