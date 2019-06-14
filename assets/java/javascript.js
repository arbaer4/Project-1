$(document).ready(function () {
    // Reddit Button On Click Event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#reddit-button").on("click", function () {

        // Ajax Function searching Reddit API for Trashtag, Sorted by newest, Limited to 20 Returns
        $.ajax({
            url: "https://www.reddit.com/search.json?q=trashtag&sort=new&limit=20",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (redditResponse) {
                console.log(redditResponse);

                // Variables to be pulled and appended to the page
                let redditTitle = redditResponse.data.children[i].data.title;
                let redditImage = redditResponse.data.children[i].data.url;
                let redditLink = redditResponse.data.children[i].data.permalink;
            });
    });

    // EventBrite Button On Click Event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#eventbrite-button").on("click", function () {
        var ebZip = $("#user-input").val().trim();

        // Ajax Function searching Eventbrite, filtered by Subcategories including Community and Environment, Zip Code used to return results sorted by closest to farthest from the user's Input
        $.ajax({
            url: "https://www.eventbriteapi.com/v3/events/search/?sort_by=-distance&location.address=" + ebZip + "&subcategories=11002%2C1003&token=LDTPIPZLQT2AUI7OBDJJ",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (ebResponse) {
                console.log(ebResponse);

                // Variables to be pulled and appended to the page
                let ebTitle = ebResponse.events[i].name.text;
                let ebSnippet = ebResponse.events[i].description.text;
                let ebLink = ebResponse.events[i].url;
            });
    });

    // OpenWeather On click event
    // TODO: Interaction with what particular responses we want to use from the Object
    // TODO: Include this API Pull with the Eventbrite button event? Pull weather info for the date of the event, in the zip code user provides?
    $("#weather-button").on("click", function () {
        var weatherZip = $("#user-input").val().trim();

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
            });
    });

    // NY Times On click event
    // TODO: Interaction with what particular responses we want to use from the Object
    $("#nyt-button").on("click", function () {

        $.ajax({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?&fq=news_desk=Environment&sort=newest&api-key=kfv7BnPMd5mvBPeGSaKGQdhyRAGGhhWG",
            method: "GET"
        })
            // Function Runs after receiving response
            .then(function (nytResponse) {
                console.log(nytResponse);

                // Variables to be pulled and appended to the page
                let nytSnippet = nytResponse.response.docs[i].snippet;
                let nytLead = nytResponse.response.docs[i].lead_paragraph;
                let nytURL = nytResponse.response.docs[i].web_url;
            });

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