/* 
Layout and Logic for Project 1

Correct query parameters for - 
    
    Reddit API
        redditResponse as function title for pull
        https://www.reddit.com/search.json?q=trashtag&sort=new&limit=20
*/
$.ajax({
    url: "https://www.reddit.com/search.json?q=trashtag&sort=new&limit=20",
    method: "GET"
})
    .then(function(redditResponse){
        console.log(redditResponse);
    });
/*
    Eventbrite API
        ebResponse as function title for pull
        API Key = LDTPIPZLQT2AUI7OBDJJ
        https://www.eventbriteapi.com/v3/events/search/?sort_by=-distance&location.address=32819&subcategories=11002%2C1003&token=LDTPIPZLQT2AUI7OBDJJ
*/
var ebZip = $("#user-input").val().trim();

$.ajax({
    url: "https://www.eventbriteapi.com/v3/events/search/?sort_by=-distance&location.address=" + ebZip + "&subcategories=11002%2C1003&token=LDTPIPZLQT2AUI7OBDJJ",
    method: "GET"
})
    .then(function(ebResponse){
        console.log(ebResponse);
    });
/*
    Openweather API
        weatherResponse as function title for pull
        http://api.openweathermap.org/data/2.5/weather?q=32819&appid=37f408cc8e84667b979fff6911c58aa0
    New York Times API
        nytResponse as function title for pull
    Earth911 API
        earthResponse as function title for pull

    Individual on click events pulling from each API for the information that we want in particular
        Click on #trashtag button to pull reddit posts relating to the trashtag movement
            5-10 posts? Perhaps just images to bring it more relatability to the user
        Click on ?Local Cleanups? to pull Evenbrite Events involving environmental ideas
            3-5 Events? Maybe Paginated, how do we filter results in order to find events specifically related to our idea
                Do we insert weather API here, maybe have it use the Eventbrite response to filter the date of the event and show forecast for the event?
        Click on NYT API to pull news articles directly relating to Environmentalism.
            Sub Branches perhaps? Climate Change, Consumerism and Consumption to tie into Alex's water bottle idea?
        Earth911 API to find local recycling centers. Create inputs to accept type of recycling and zip code 
            Type input possibly best off as a dropdown menu, only give the user the options we know will work, otherwise we may end up with a failed search
    
    
    Uses for Database/localStorage information  
        Possibly useful to save Events from the Eventbrite API
        Maybe have a seperate button and tab where the user can save any Articles, Events or #trashtag posts they enjoy.
    
*/